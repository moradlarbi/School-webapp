import { useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid';
import styled from "@emotion/styled";
import moment from 'moment';
import 'moment/locale/fr';
import "./styles.css"

export const StyleWrapper = styled.div`
    
    .fc-toolbar-chunk div{
        display: flex;
  }
  .fc-scrollgrid-section {
      display: none;
  }
  .fc-scrollgrid-section-liquid,.fc-scrollgrid-section-header  {
      display: table-row;
  }
  thead tr td .fc-scroller-harness .fc-scroller {
      overflow: hidden !important;
  }
  .fc-button-primary {
      color: #000;
      font-family: 'Nunito', sans-serif;
      font-weight: bold;
      background-color: rgb(238, 238, 238);
      padding: 5px 20px;
      border: 2px solid rgb(238, 238, 238);
      outline: none !important;
      border-radius: 5px;
  }
  .fc-button-active, .fc-button:hover {
      color: #2596be !important; 
      outline: none !important;
      background-color: rgb(238, 238, 238) !important;
      border: 2px solid #2596be !important;
      position: relative;
  }
  .fc-button-group .fc-button-active::after {
      content: '';
      position: absolute;
      height: 103%;
      width: 102%;
      top: -1%;
      left: -1%;
      background-color: rgba(37, 150, 190, 0.05);
  }
  .fc-today-button {
    background-color: rgb(238, 238, 238) !important;
    color: #000 !important;
    cursor: pointer;
    border: none !important;
    outline: none !important;
  }
  .fc-next-button, .fc-prev-button, .fc-next-button:hover, .fc-prev-button:hover {
      background-color: #ffffff !important;
      border: none !important;
      outline: none !important;
      padding: 5px 10px !important;
      
  } 
  .fc-icon {
    font-size: 0.9rem !important;
    width: 0.8em;
  }
  
  .fc-header-toolbar > .fc-toolbar-chunk:first-of-type div {
      border: 1px solid black;
      font-size: 0.6rem;

  }
  .fc-header-toolbar > .fc-toolbar-chunk:first-of-type div {
      margin-left: 250px;
  }
  .fc-header-toolbar > .fc-toolbar-chunk:first-of-type {
      position: relative;

  }
  .fc-header-toolbar > .fc-toolbar-chunk:first-of-type div::before {
      content: "Emploie du temps";
      font-size: 1.5rem;
      font-weight: 900;
      position: absolute;
      left: 5px;
      top: -3px;
  }
  .fc-toolbar-title {
    padding-top: 2px;
}
  @media only screen and (max-width: 768px) {
    .fc-header-toolbar {
        margin-top: 50px;
        position: relative;
    }
    .fc-header-toolbar > .fc-toolbar-chunk:first-of-type div {
        margin-left: 0px;
    }
    .fc-header-toolbar > .fc-toolbar-chunk:first-of-type div::before {
        font-size: 0.9rem;
        top: -50px;
    }
    .fc-toolbar-title {
        text-align: center;
    }
    .fc-today-button {
        position: absolute;
        top: -50px;
        right: 5px;
    }
    .fc-today-button:hover {
        position: absolute;
        top: -50px;
        right: 5px;
    }
    .fc-event-title  {
        position: relative;
        text-transform: capitalize;
        font-weight: 500;
        padding: 2px 4px;
        font-size: 0.8rem;
        transition-duration: 0.3s;
      }
      .fc-event-time {
        padding: 2px 4px;
        font-size: 0.7rem;
      }
  }
  



  
  
`

const TimeTracking = ({info}) => {
    const [events, setEvents] = useState([])
    const [b, setB] = useState(false)

    useEffect(() => {
        //console.log(info)
        if (info.type === "prof"){
            console.log(info.events)
            setEvents(info.events)
        }
        if (info.type === "etudiant"){
            console.log("etudiant")
            const nom = info.niveau
            fetch(`http://localhost:8080/niveaux/class?nom=${nom}`)
            .then(res => {
                if (res.ok){
                    console.log(res)
                    return res.json()
                }
            })
            .then(jsonRes => {
                console.log(jsonRes)
                setEvents(jsonRes.events)
                setB(!b)
            })
        }
        
        
        
    },[info])
    useEffect(() => {
        console.log(events)
    },[b])
    return (
        <div className="timeTracking-container">
            <StyleWrapper>
            <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="timeGridWeek"
                height= "90vh"
                events={events}
                headerToolbar= {{
                    left:"prev,title,next",
                    center: "today",
                    right: "timeGridDay,timeGridWeek,dayGridMonth"
                    
                }}
                allDaySlot= "none"
                slotMinTime = "07:00:00"
                slotMaxTime = "19:00:00"
                locale= "fr"
                eventColor= "#e19ca1"
                dayHeaderContent = {
                    (args) => {
                        return moment(args.date).local('fr').format('ddd Do')
                }}                
            />
            </StyleWrapper>
        </div>
    )
}

export default TimeTracking
