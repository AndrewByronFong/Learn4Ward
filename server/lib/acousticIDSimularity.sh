if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <input_file1> <input_file2> <audioprocessingcmd>"
    exit 1
fi

audioprocessingcmd="$3"

f1=$(eval $audioprocessingcmd "$1" 2>&1)
f2=$(eval $audioprocessingcmd "$2" 2>&1)

# Ensure both strings are of equal length
len1=${#f1}
len2=${#f2}

if [ "$len1" -ne "$len2" ]; then
    echo "error: one of the file was not found."
    exit 1
fi

total_bits=${#f1}

# Initialize variables to count similarities and total bits
similar_bits=0

# Loop over each bit
for (( i=0; i<$total_bits; i++ )); do
    bit_f1="${f1:$i:1}"
    bit_f2="${f2:$i:1}"
    if [[ "$bit_f1" == "$bit_f2" && "$bit_f1" != "0" && "$bit_f1" != "f" ]]; then
        ((similar_bits++))
    fi
done

# Calculate similarity percentage
similarity=$(echo "scale=2; $similar_bits / $total_bits * 100" | bc)

# Output the similarity percentage
echo "$similarity"