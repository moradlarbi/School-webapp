import React from 'react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid';
//import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import styled from "@emotion/styled";
import { useRef, useState, useEffect } from 'react';
import interactionPlugin from '@fullcalendar/interaction';
import  Event  from './Event';
import moment from 'moment';
import axios from 'axios';
import 'moment/locale/fr';
import './styles.css'

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
.fc-event-main-frame {
  flex-direction: column-reverse;
  
}
.remove-btn {
  position: absolute;
  cursor: pointer;
  top: 1px;
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
.fc-timegrid-event-harness-inset {
  right: 0% !important;
  left: 0% !important;
}



`
const EDT = ({matiere, prof, salle, info}) => {
  const [classe, setClasse] = useState("")
  const [title, setTitle] = useState("")
  const [eventInfo, setEventInfo] = useState({})
  const [i, setI] = useState(false)
  const [start, setStrat] = useState(new Date())
  const [end, setEnd] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)
  const [remove, setRemove] = useState(false)
  const [s, setS] = useState(false)
  const [empty, setEmpty] = useState(undefined)
  const [event, setEvent] = useState(null)
  const [events, setEvents] = useState([])
  let calendarRef = useRef(null)
  useEffect(() => {
    setTitle(prof +" "+matiere + " "+ salle)
  },[prof,salle,matiere])
  

const eventAdd = () => {
  let calendarApi = calendarRef.current.getApi();
  calendarApi.addEvent({
    title: title,
    prof: prof,
    start: start,
    matiere: matiere,
    salle: salle,
    end: end,
    dow: [ 1, 4 ]
  })
  
}
const didMountRef = useRef(false);
useEffect(() => {
  if (didMountRef.current){
    eventAdd()
    setS(!s)
    
    
    // btns.forEach((btn) => {
    //   if (!btn.classList.contains("has")){
    //     btn.appendChild(x)
    //     btn.classList.add("has")
    //   }
        
    // })
    
  }
  else {
    didMountRef.current = true
  }
  
}, [i])
useEffect(() => {
  const btns = document.querySelectorAll(".fc-event-main-frame")
    
    btns.forEach((btn) => {
      if (btn.querySelector(".remove-btn") === null){
        let x = document.createElement("span")
        x.classList.add("remove-btn")
        x.textContent = "x"
        x.addEventListener("click",(e)=> {
          setRemove(true)
          setEmpty(e.target.parentNode.parentNode.parentNode.parentNode)
          
        })
        btn.querySelector(".fc-event-title-container").appendChild(x)
      }
    })

  
},[s])
useEffect(()=> {
  
  if (empty !== undefined){
    empty.remove()
  }
},[empty])
useEffect(()=> {
  if (event !== null){
    event.setProp("overlap",true);
  }
},[event])
const sauv = () => {
  let calendarApi = calendarRef.current.getApi();
  console.log(calendarApi.getEvents())
  const ob = {
    nom: classe,
    arr: calendarApi.getEvents()
  }
  axios.post("http://localhost:8080/niveaux/save",ob)
}
useEffect(() => {
  setClasse(info.nom)
  setEvents(info.events)
},[info])

    return (
            <div className="timeTracking-container">
              
              <div className="header">
                  <h2>Emploie du temps de la classe {classe}</h2>
                  <button className="btn-sauv" onClick={sauv}>
                        Sauvegarder
                  </button>
              </div>
            <StyleWrapper >
                
              
              
            <FullCalendar
                ref={calendarRef}
                plugins={[ dayGridPlugin, timeGridPlugin, /*resourceTimelinePlugin,*/ interactionPlugin ]}
                initialView="timeGridWeek"
                selectable="true"
                events={events}
                select={
                  function(info) {
                    if (!remove){
                      setStrat(new Date(info.startStr))
                      setEnd( new Date(new Date(info.endStr).getTime() + (30*60*1000)) )
                      setI(!i) 
                    }
                    else {
                      setEvent(info.event.setProp("overlap",true))
                      
                    }
                    
                  }
                }
                height= "90vh"
                headerToolbar= "false"
                allDaySlot= "none"
                slotMinTime = "07:00:00"
                slotMaxTime = "19:00:00"
                locale= "fr"
                editable="true"
                droppable="true"
                dropAccept= "true"
                eventClick = {
                  (info) => {
                    
                    //let  = info.el
                    if (remove){
                      info.el.remove()
                      setRemove(false)
                    }
                    else {
                      if (prof !== ""){
                        info.event.setExtendedProp("prof",prof)
                      }
                      if (matiere !== ""){
                        info.event.setExtendedProp("matiere",matiere)
                      }
                      if (salle !== ""){
                        info.event.setExtendedProp("salle",salle)
                      }                 
                      info.event.setProp("title",info.event.extendedProps.prof+" "+info.event.extendedProps.matiere+" "+info.event.extendedProps.salle)
                    }
                    
                    
                  }
                }
                eventDrop= {
                  (eventDropInfo) => {
                    setS(!s)
                  }
                }
                dayHeaderContent = {
                    (args) => {
                        return moment(args.date).local('fr').format('dddd')
                }}
                eventColor= "#e19ca1"
                
                slotEventOverlap="false"
                
                
            />
            </StyleWrapper>
            <Event open={isOpen} evenInfo={eventInfo} onClose={() => {
              setIsOpen(false)
              } } />
            
        </div>
    )
}

export default EDT
