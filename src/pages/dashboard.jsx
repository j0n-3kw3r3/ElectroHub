import Overview from "../components/dashboard/desktop/Overview";
import MobileOverview from "../components/dashboard/mobile/overview";

function Dashboard() {


  return (
    <div className="">
      <div className="hidden md:block"><Overview/></div>
      <div className="md:hidden block"><MobileOverview/></div>
    </div>
  );
}

export default Dashboard;
