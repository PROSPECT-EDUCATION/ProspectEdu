import { useState } from "react";
import ParentSidebar from "../../components/Parent/ParentSidebar";
import ParentTopbar from "../../components/Parent/ParentTopbar";
import PaymentSummaryCard from "../../components/Parent/Payments/PaymentSummaryCard";
import FeeTable from "../../components/Parent/Payments/FeeTable";
import PaymentHistory from "../../components/Parent/Payments/PaymentHistory";
import UpcomingDueBox from "../../components/Parent/Payments/UpcomingDueBox";

import { parentStudents } from "../../data/parentStudents";
import { parentPayments } from "../../data/parentPayments";

import { Wallet, CheckCircle, Clock } from "lucide-react";

export default function ParentPaymentsPage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? 80 : 256;

  const [selectedStudent, setSelectedStudent] = useState(parentStudents[0].id);

  const paymentData = parentPayments[selectedStudent];

  return (
    <div className="flex h-screen bg-[#F9FAFB]">

      {/* SIDEBAR */}
      <div
        className="fixed top-0 left-0 h-full transition-all duration-300"
        style={{ width: sidebarWidth }}
      >
        <ParentSidebar 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
      </div>

      {/* MAIN */}
      <div 
        className="flex-1 flex flex-col"
        style={{ marginLeft: sidebarWidth }}
      >
        <ParentTopbar 
  pageTitle="Payments"
  students={parentStudents}   
  selectedStudent={parentStudents.find(s => s.id === selectedStudent)}
  onSelectStudent={(s) => setSelectedStudent(s.id)}
  showStudentSwitcher={true}
/>

        <div className="p-6 space-y-6 overflow-y-auto">

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <PaymentSummaryCard 
              title="Total Fees" 
              value={`₹${paymentData.summary.total}`} 
              icon={Wallet} 
            />

            <PaymentSummaryCard 
              title="Paid" 
              value={`₹${paymentData.summary.paid}`} 
              icon={CheckCircle} 
            />

            <PaymentSummaryCard 
              title="Pending" 
              value={`₹${paymentData.summary.pending}`} 
              icon={Clock} 
            />

            <PaymentSummaryCard 
              title="Next Due" 
              value={paymentData.summary.nextDue} 
              icon={Clock} 
            />
          </div>

          {/* TABLE */}
          <FeeTable items={paymentData.feeBreakdown} />

          {/* PAYMENT HISTORY */}
          <PaymentHistory history={paymentData.history} />

          {/* UPCOMING DUE */}
          <UpcomingDueBox due={paymentData.summary.nextDue} />
        </div>
      </div>
    </div>
  );
}
