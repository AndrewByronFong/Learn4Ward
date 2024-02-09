#include <iostream>
#include <string>

using namespace std;

int main() {
    string s;
    cin>>s;
    vector<string> v;
    string c;
    while(cin>>c){
        v.push_back(c);
    }

    string r = s+": { ";
    for(auto w:v){
        r+=(w+": '"+w+".m4a', ");
    }
    r=r.substr(0, r.length()-2);
    r+=" },";
    cout<<r<<'\n';
    return 0;
}
