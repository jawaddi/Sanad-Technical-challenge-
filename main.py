
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all origins 

# hellp to use the url so we can access to the data 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)



#read the file usernames.txt
# we are gonna read line by line and strip the whitespace

with open("name.txt", "r") as file:
    names = [line.strip() for line in file]

# the numbers of names that we want to read per scroll
# we count a scroll when we arrive the bottom  
# names_per_scroll  shoud be greater than  16 so we can scroll

names_per_scroll = 20
#
@app.get("/names/") #endpoint
async def read_names(limit: int = 1):

    # the index where we start reading the names
    s_index = (limit - 1) * names_per_scroll
    
    e_index = min(limit * names_per_scroll,len(names))
   
    # here we toke names what will be displyed on the broswer
    displyed_names = names[s_index:e_index]
    
    #
    return displyed_names

