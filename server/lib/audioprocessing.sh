#!/bin/bash

# Esure Active Sound From: 1 - 4 seconds

# Check if an input file was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <input_file>"
    exit 1
fi

input_file="$1"

# Determine the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Construct the path to the FFmpeg executable within the same directory
FFMPEG="$SCRIPT_DIR/ffmpeg"

# Run FFmpeg with silencedetect and capture the output
output=$($"FFMPEG" -i "$input_file" -af silencedetect=noise=-70dB:d=0.6 -f null - 2>&1)

# Process the output to extract silence start and end times
silence_starts=()
silence_ends=()

while IFS= read -r line; do
    if [[ $line == *"silence_start:"* ]]; then
        # Extracting the silence start time
        start_time=$(echo $line | awk -F 'silence_start: ' '{print $2}')
        silence_starts+=("$start_time")
    elif [[ $line == *"silence_end:"* ]]; then
        # Extracting the silence end time
        # Using awk to get the value before the '|' character
        end_time=$(echo $line | awk -F 'silence_end: ' '{print $2}' | awk -F ' | ' '{print $1}')
        silence_ends+=("$end_time")
    fi
done <<< "$output"

input_base_name=$(basename "$input_file" | sed 's/\.[^.]*$//')
# Define the output file name
output_file="trimmed_${input_base_name}.wav"

# Initialize the start time for the first segment
current_start="0"

# Initialize the FFmpeg filter complex command
filter_complex=""

# Loop over the silence periods to build the filter complex
segment_index=0
for i in "${!silence_starts[@]}"; do
    current_end="${silence_starts[$i]}"
    if [ "$i" -ne 0 ] || (( $(echo "$current_end > 0" | bc -l) )); then
        filter_complex+="[0:a]atrim=start=${current_start}:end=${current_end},asetpts=PTS-STARTPTS[${segment_index}v];"
        segment_index=$((segment_index+1))
    fi
    current_start="${silence_ends[$i]}"
done

# Add the last segment after the final silence
filter_complex+="[0:a]atrim=start=${current_start},asetpts=PTS-STARTPTS[seg${segment_index}];"

# Now create the concat part of the filter_complex
concat_cmd="concat=n=$((${segment_index} + 1)):v=0:a=1[aout]"

# Append each segment to the concat command
for (( j=0; j<=segment_index; j++ )); do
    concat_cmd="[seg${j}]"$concat_cmd
done

# Combine all parts to form the complete FFmpeg command
ffmpeg_cmd="\"$FFMPEG\" -i \"$input_file\" -filter_complex \"$filter_complex$concat_cmd\" -map \"[aout]\" -acodec pcm_s16le \"$output_file\""

# Execute the FFmpeg command and save the output to a variable
ffmpeg_output=$(eval $ffmpeg_cmd 2>&1)

duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$output_file")

# Calculate the necessary tempo to scale the audio to 2 seconds
# Formula: new tempo = original duration / desired duration
new_tempo=$(echo "$duration / 2" | bc -l)

# Check if the tempo is within the valid range for atempo filter (0.5 to 2.0)
# If not, you'll need to adjust this part of the script to handle tempos outside this range
if (( $(echo "$new_tempo < 0.5" | bc -l) )); then
    echo "Error: Calculated tempo is too low"
    exit 1
elif (( $(echo "$new_tempo > 2.0" | bc -l) )); then
    echo "Error: Calculated tempo is too high"
    exit 1
fi

scaled_output_file="scaled_${input_base_name}.wav"

# Store the FFmpeg scaling command in a variable
ffmpeg_scale_cmd="\"$FFMPEG\" -i \"$output_file\" -filter:a \"atempo=$new_tempo\" -acodec pcm_s16le \"$scaled_output_file\""

# Execute the FFmpeg scaling command and save the output to a variable
ffmpeg_scale_output=$(eval $ffmpeg_scale_cmd 2>&1)

# Check if the scaled output file exists
if [ ! -f "$scaled_output_file" ]; then
    echo "Error: File $scaled_output_file not found."
    exit 1
fi

# Initialize the FFmpeg filter complex command for concatenation
filter_complex_concat=""

# Loop to create inputs for the concat filter
for i in {1..6}; do
    filter_complex_concat+="[$((i-1)):a]"
done

# Add the concat filter with the correct number of inputs
filter_complex_concat+="concat=n=6:v=0:a=1[aout]"

output_12sec="$input_base_name"_12sec.wav
# Combine the audio files using the correct concat filter
ffmpeg_cmd="$FFMPEG"
for i in {1..6}; do
    ffmpeg_cmd+=" -i \"$scaled_output_file\""
done
ffmpeg_cmd+=" -filter_complex \"$filter_complex_concat\" -map \"[aout]\" -acodec pcm_s16le \"$output_12sec\""

# Execute the FFmpeg command and save the output to a variable
ffmpeg_output=$(eval $ffmpeg_cmd 2>&1)

acoustic_fingerprint=$(eval /Users/andrewfong/Azure/DyslexiaApp/Learn4Ward/server/lib/IDGeneration "$output_12sec" 2>&1)

echo "$acoustic_fingerprint"

# Remove intermediate files
rm "$output_file"
rm "$scaled_output_file"
rm "$output_12sec"

