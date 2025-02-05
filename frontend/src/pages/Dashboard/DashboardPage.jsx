import { useDispatch } from "react-redux"
import { isDashboardAction } from "../../store/dashboard/dashboardSlice"
import { useEffect } from "react"
import SidebarComponent from "../../adminComponents/SideBar/SideBarComponent"




function DashboardPage() {
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(isDashboardAction(true))  
  },[dispatch]) 
  


  
  return (
    <>
    <div className="container-fluid p-0">
      <div className="row m-0">
      <div className="col-md-3 p-0">
        <SidebarComponent/>
      </div>
      <div className="col-md-9 p-0">
        Views
      </div>
      </div>
    </div>
 
    
    </>
  )
}

export default DashboardPage