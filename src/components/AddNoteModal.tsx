import { FC } from "react"


const AddNoteModal:FC<any> = ({setNote, addNote, note}) => {

    return (
        <div className="modal fade" id="addNoteModal" tabIndex={-1} aria-labelledby="addNoteModalDetail" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Note :</label>
                            <input type="text" className="form-control" id="recipient-name" value={note} onChange={(e)=>setNote(e.target.value)}/>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={()=>addNote()}>Add</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNoteModal