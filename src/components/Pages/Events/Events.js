import React, { useState, useEffect } from "react";
import moment from "moment";
import EventCard from "./Event-Card/index";

//preloader
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

//@material-ui
import Typography from "@material-ui/core/Typography";

import "./css/Events.styles.css";

//data
// import eventData from "./data/events.json";

import {
  getAllEvents,
  // getAllCategories,
  getCate,
} from "../../../admin/helper/adminapicalls";
import makeToast from "../../utils/Toaster/Toaster";
// import { CgLayoutGridSmall } from "react-icons/cg";

//preloader css
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const styles = {
  background: "#2b5876",
  backgroundImage: "linear-gradient(45deg, #574133 0%, #ff8b07 84%)",
};

export const Events = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  let [loading, setLoading] = useState(true);

  // const [sameDate, setSameDate] = useState("");
  // const [categories, setCategories] = useState([]);

  // setDelay = () =>{

  // };

  const preload = () => {
    
    // getAllCategories().then(data => {
    //   if (data.error) {
    //     console.log(data.error);
    //   } else {
    //     setCategories(data);
    //   }
    // });

    getAllEvents().then((data) => {
      setLoading(true);
      console.log("LOADING DATA.....value is ", loading);

      if (data.error) {
        setLoading(false);
        console.log(" ERROR LOADING IS", loading);
        makeToast("error", data.error);
      } else {
        // setCategories(data);
        setLatestEvents(data.upcomingEvent);
        setPastEvents(data.pastEvent);
        // console.log(data.upcomingEvent);
        // console.log(data.pastEvent);
        console.log("data retrieved is ", data)
        setLoading(false);

      }
    });
  };

  useEffect(() => {
    preload();
    // setDelay();
  }, []);

  // console.log(events);
  // console.log(categories);

  return (
    <div className="dark">
      {loading ? (
        <>
        <h3>Loading</h3>
        <HashLoader
          color= "white"
          loading={loading}
          css={override}
          size={150}
        />

        </>

         ) : 
        <>
          <div className="event-about-dark"></div>
          <div className="events-section">
            <Typography
              variant="h3"
              className="about-dark"
              id="MuiTypography-h3"
            >
              Latest Events
            </Typography>
            <div className="dash dash-dark" style={styles}></div>
            <div className="row1">
              {latestEvents.length === 0 ? (
                <h1>No Events Found!</h1>
              ) : (
                <>
                  {latestEvents &&
                    latestEvents.map((event) => {
                      console.log(event);
                      let START_DATE = moment(event.date.startDate).format(
                        "MMMM Do YYYY"
                      );
                      let END_DATE = moment(event.date.endDate).format(
                        "MMMM Do YYYY"
                      );

                      return (
                        <>
                          <EventCard
                            event={event}
                            img={event.image}
                            eventTitle={event.name}
                            eventStartDate={START_DATE}
                            eventEndDate={END_DATE}
                            eventInfo={event.info}
                            eventLink={"eventLink"}
                            open={true}
                            linkedinLink={event.linkedinURL}
                            instagramLink={event.instagramURL}
                          />
                        </>
                      );
                    })}
                </>
              )}

              {/* {Object.keys(eventData).map(category => {
              if (category === "latest") {
                return eventData[category].map(categoryObject => {
                  return (
                    <EventCard
                      img={categoryObject.img}
                      eventTitle={categoryObject.title}
                      eventDate={categoryObject.date}
                      eventInfo={categoryObject.info}
                      eventLink={categoryObject.link}
                      open={categoryObject.open}
                      linkedinLink={categoryObject.linkedin}
                      instagramLink={categoryObject.instagram}
                    />
                  );
                });
              }
              return null;
            })} */}
            </div>
          </div>

          <div className="event-about-dark"></div>
          <div className="events-section">
            <Typography
              variant="h3"
              className="about-dark"
              id="MuiTypography-h3"
            >
              Past Events Section
            </Typography>
            <div className="dash dash-dark" style={styles}></div>
            <div className="row1">
              {pastEvents.length === 0 ? (
                <h1>No Events Found!</h1>
              ) : (
                <>
                  {pastEvents &&
                    pastEvents.map((event) => {
                      console.log("PAST EVENT", event);
                      let START_DATE = moment(event.date.startDate).format(
                        "MMMM Do YYYY"
                      );
                      let END_DATE = moment(event.date.endDate).format(
                        "MMMM Do YYYY"
                      );

                      return (
                        <>
                          <EventCard
                            event={event}
                            img={event.image}
                            eventTitle={event.name}
                            eventStartDate={START_DATE}
                            eventEndDate={END_DATE}
                            eventInfo={event.info}
                            eventLink={"eventLink"}
                            open={true}
                            linkedinLink={event.linkedinURL}
                            instagramLink={event.instagramURL}
                          />
                        </>
                      );
                    })}
                </>
              )}

              {/* {Object.keys(eventData).map(category => {
              if (category === "past") {
                return eventData[category].map(categoryObject => {
                  return (
                    <EventCard
                      img={categoryObject.img}
                      eventTitle={categoryObject.title}
                      eventDate={categoryObject.date}
                      eventInfo={categoryObject.info}
                      eventLink={categoryObject.link}
                      open={categoryObject.open}
                      linkedinLink={categoryObject.linkedin}
                      instagramLink={categoryObject.instagram}
                    />
                  );
                });
              }
              return null;
            })} */}
            </div>
          </div>
        </>
      
          }
    </div>
  
  )}
