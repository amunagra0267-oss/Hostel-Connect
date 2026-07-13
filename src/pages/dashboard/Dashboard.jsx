import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useStudent } from "../../context/StudentContext";
import StatCard from "../../components/cards/StatCard";
import MenuCard from "../../components/cards/MenuCard";
import NoticeCard from "../../components/cards/NoticeCard";
import ComplaintCard from "../../components/cards/ComplaintCard";
import MeetingCard from "../../components/cards/MeetingCard";
import QuickActionCard from "../../components/cards/QuickActionCard";
import SectionCard from "../../components/common/SectionCard";
import todaysMenu from "../../data/Mess";
import notices from "../../data/Notices";
import meetings from "../../data/Meetings";
import complaints from "../../data/Complaints";


const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { student } = useStudent();

 const meeting = meetings[0];

 const latestComplaint = complaints[0];



  const statistics = useMemo(() => {
    return [
      {
        title: "Room",
        value: student.room,
      },
      {
        title: "Complaint",
        value: latestComplaint.status,
      },
      {
        title: "Visitor",
        value: "1 Pending",
      },
      {
        title: "Leave",
        value: "Approved",
      },
    ];
  }, [student.room]);


  const quickActions = [
    {
      title: "Raise Complaint",
      path: "/raise-complaint",
    },
    {
      title: "Apply Leave",
      path: "/apply-leave",
    },
    {
      title: "Visitor Pass",
      path: "/visitor",
    },
    {
      title: "My Room",
      path: "/my-room",
    },
    {
      title: "Mess Menu",
      path: "/mess",
    },
  ];

  const noticesByDate = useMemo(() => {
    const groups = {};
    notices.forEach((n) => {
      groups[n.date] = groups[n.date] || [];
      groups[n.date].push(n);
    });
    return groups;
  }, [notices]);

  return (
    <div>

      <h1>
        Good Morning, {user?.name} 👋
      </h1>

      <p>Hostel : {student.hostel}</p>

      <p>Room : {student.room}</p>

      <p>Block : {student.block}</p>

      <SectionCard title="Quick Statistics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statistics.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Quick Actions">
        <div className="flex flex-wrap items-start">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.title}
              title={action.title}
              onClick={() => navigate(action.path)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title={"Today's Mess Menu"}>
        <div className="space-y-2">
          {todaysMenu.map((meal) => (
            <MenuCard
              key={meal.meal}
              meal={meal.meal}
              food={meal.food}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Upcoming Hostel Meeting">
        <MeetingCard
          title={meeting.title}
          date={meeting.date}
          time={meeting.time}
          venue={meeting.venue}
        />
      </SectionCard>

      <SectionCard title="Latest Complaint">
        <ComplaintCard
          category={latestComplaint.category}
          status={latestComplaint.status}
          createdAt={latestComplaint.createdAt}
        />
      </SectionCard>

      <SectionCard title="Latest Notices">
        <div>
          {Object.entries(noticesByDate).map(([date, items]) => (
            <div key={date} className="mb-4">
              <h3 className="text-md font-semibold mb-2">{date}</h3>
              {items.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  title={notice.title}
                  date={notice.date}
                  showDate={false}
                />
              ))}
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
};

export default Dashboard;