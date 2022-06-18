import { useEffect, useState } from "react";
import getData from "../../../services/APICalls";
import dateFormat from "dateformat";
import DetailsModal from "../../../components/DetailsModal";
import AddNoteModal from "../../../components/AddNoteModal";

export type Param = {
    offset:number,
    limit:number
}

function Calls() {

const token:string = localStorage.getItem("authorization") || "" 
const [calls, setCalls] = useState<any>({})
const [callDetails, setCallDetails] = useState<any>({})
const [note, setNote] = useState<string>("")
const [callId, setCallId] = useState<string>("")
const [params, setParams] = useState<Param>({
    offset:0,
    limit:10
})

const handleModalOpen = (id:any) => {
    setCallId(id)
    setNote("")
}

const handleLimit = (limit:number)=>{
    params.limit = limit
    setParams({...params})
}

const handleOffset = (type:string)=>{
    params.offset = type=== "next" ? params.offset+1 : params.offset === 0 ? 0 : params.offset - 1
    setParams({...params})
}

const handleArchieve = (id:string, isArchieved:boolean) => {
    getData(`/calls/:${id}/${isArchieved? 'unarchive ': 'archive'}`, token, {}, "put").then((res)=>{
        console.log(res)
    })
}

useEffect(()=>{
  getCalls()
  //eslint-disable-next-line
},[params])

const getCalls = () => {
    getData(`/calls?offset=${params.offset}&limit=${params.limit}`, token, {}, "get").then((res)=>{
       setCalls(res.data)
    })
}

const getCallDetails = (id:any, callDetails:any) =>{
    getData(`/calls/:${id}`, token, {}, "get").then((res)=>{
        
        if(res.error){
            setCallDetails({...callDetails})
        }
        else{
            setCallDetails(res.data)
        }
     }).catch(err=>{
          console.warn(err)
     })
}

const addNote = () => {
    
    getData(`/calls/:${callId}/note`, token, {content:note}, "post").then((res)=>{
        getCalls()
     }).catch(err=>{
          console.warn(err)
     })
}

const groupByDate = () => {
   calls.nodes = calls.nodes?.sort((a:any, b:any)=>{
        return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0
    })

    setCalls({...calls})
}

if(!calls)
    return (
        <>
            <div style={{display:'block', marginLeft:'40%'}}>
               
            </div>
        </>  
    )

  return (
    <div className="mt-2">
        <div className="row mb-3">
            <div className="col-2">
                <select className="form-select ms-2" value={params.limit} onChange={(e)=>handleLimit(Number(e.target.value))} aria-label="Default select" id="controllPageLimit">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <div className="col-10">
                <button className="btn btn-outline-primary" type="button" onClick={()=>groupByDate()}>Group By Date</button>
                <button className="btn btn-outline-secondary ms-2" type="button" onClick={()=>getCalls()}>Reset</button>
            </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Sr No.</th>
                <th scope="col">Call Type</th>
                <th scope="col">Created At</th>
                <th scope="col">Direction</th>
                <th scope="col">Duration</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                calls?.nodes && calls.nodes?.length && calls?.nodes?.map((node:any, index:number)=>{
                    return (
                        <tr key={node.id}>
                            <td>{params.offset * params.limit + index + 1}</td>
                            <td>{node.call_type}</td>
                            <td>{dateFormat(node.created_at, "dd-mm-yyyy")}</td>
                            <td>{node.direction}</td>
                            <td>{`${Math.floor(node.duration/60000) !== 0 ? Math.floor(node.duration/60000) + " minutes ": ""} ${Math.floor(node.duration/1000)} seconds`}</td>
                            <td>{node.from}</td>
                            <td>{node.to}</td>
                            <td>
                            <button className="btn btn-outline-danger me-2" type="button" data-bs-toggle="modal" data-bs-target="#detailModal" onClick={()=>getCallDetails(node.id, node)}>Show Details</button>
                            <button className="btn btn-outline-warning me-2" type="button" onClick={()=>handleArchieve(node.id, node.is_archieved)}>Archieve</button>
                            <button className="btn btn-outline-primary" type="button" data-bs-toggle="modal" data-bs-target="#addNoteModal" onClick={()=>handleModalOpen(node.id)}>Add Note</button>
                            </td>
                        </tr>
                    )
                })
              }
            </tbody>
          </table>
          </div>
          <div className="mt-3 mb-3">
                 <button className="btn btn-outline-danger me-2" type="button" disabled={params.offset === 0 ? true : false} onClick={()=>handleOffset("prev")}>Previous</button>
                 <button className="btn btn-outline-warning" type="button" disabled={calls.hasNextPage?false:true} onClick={()=>handleOffset("next")}>Next</button>
          </div>

          {/*Detail Modal*/}
          <DetailsModal callDetails={callDetails}/>
          {/*Add Note Modal */}
          <AddNoteModal setNote={setNote} addNote={addNote} note={note}/>
    </div>
    
  );
}

export default Calls;
