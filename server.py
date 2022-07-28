import sys
import os
from time import sleep
pyver = sys.version_info.major
print("Python major version:", pyver)
if pyver in [2]:
    import subprocess
    import SimpleHTTPServer
elif pyver in [3]:
    from http.server import HTTPServer, CGIHTTPRequestHandler
    import http
else:
    print("Unknown Python major version", pyver)



if __name__ == "__main__":

    os.chdir('.')
    if pyver in [3]:
        print(dir(http))
        server_object = HTTPServer(server_address=('', 8000), RequestHandlerClass=CGIHTTPRequestHandler)
        server_object.serve_forever()
    elif pyver in [2]:
        cmd = '/usr/bin/python -m SimpleHTTPServer'
        pro = subprocess.Popen(cmd, shell=True, preexec_fn=os.setsid)
        


    
