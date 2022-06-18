import { FC } from "react"

const DetailsModal:FC<any> = ({callDetails}) => {

    return (
        <div className="modal fade" id="detailModal" tabIndex={-1} aria-labelledby="detailModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Call Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="d-flex "> <b>Call Type :</b> <span className="ms-4">{callDetails?.call_type}</span>  </div><br/>
                    <div className="d-flex "> <b>Time :</b> <span className="ms-4">{callDetails?.from} </span>  </div><br/>
                    <div className="d-flex "> <b>Direction :</b> <span className="ms-4">{callDetails?.direction}  </span>  </div><br/>
                    <div className="d-flex "> <b>Duration :</b> <span className="ms-4"> {`${Math.floor(callDetails?.duration/60000) !== 0 ? Math.floor(callDetails?.duration/60000) + " minutes ": ""} ${Math.floor(callDetails?.duration/1000)} seconds`}  </span>  </div><br/>
                    <div className="d-flex "> <b>From :</b> <span className="ms-4">{callDetails?.from}  </span>  </div><br/>
                    <div className="d-flex "> <b>To :</b> <span className="ms-4">{callDetails?.to}  </span>  </div><br/>
                        
                    <div className="d-flex "><b>Notes :</b>
                            { callDetails?.notes?.length > 0 ?
                                (<div className="table-responsive">
                                    <table className="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Note</th>      
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            callDetails?.notes?.map((note:any, index:number)=>{
                                            return(
                                                <tr>
                                                    <td>
                                                    {index + 1}
                                                    </td>
                                                    <td>
                                                    {note.content}
                                                    </td>
                                                </tr>
                                            )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>) :(<div className="ms-4">No Notes</div>)
                            }
                        </div>

                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsModal