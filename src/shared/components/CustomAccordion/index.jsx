import React from "react";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import { Call, Clock, Location, Sms } from "../../../assets/svgs";
import "./CustomAccordion.scss";
import RenderIf from "../RenderIf";
import Spinner from "../Spinner";

const CustomAccordion = ({ offices, isLoading }) => {
  return (
    <>
      <RenderIf condition={!isLoading}>
        {offices?.map((office) => (
          <div key={office?.id} className="CustomAccordion">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{office?.cusOffShortName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="CustomAccordion-center">
                  <h1>General information</h1>
                  <label>
                    <Location />
                    <p>{office?.address}</p>
                  </label>
                  <label>
                    <Sms />
                    <p>{office?.email}</p>
                  </label>
                  <label>
                    <Call />
                    <p>{office?.phone}</p>
                  </label>
                  <label>
                    <Clock />
                    <p>{office?.workHour}</p>
                  </label>
                </div>
              </AccordionDetails>
              <AccordionDetails>
                <div className="CustomAccordion-end">
                  <label htmlFor="">
                    <p>Contry</p>
                    <span>{office?.countryName}</span>
                  </label>
                  <label htmlFor="">
                    <p>Customs office code in transit system </p>
                    <span>{office?.cusOffCodeOrg}</span>
                  </label>
                  <label htmlFor="">
                    <p>Short name of Customs office</p>
                    <span>{office?.cusOffShortName}</span>
                  </label>
                  <label htmlFor="">
                    <p>Customs office code </p>
                    <span>{office?.cusOffCodeSys}</span>
                  </label>
                  <label htmlFor="">
                    <p>Location of Customs office</p>
                    <span>
                      {office?.boundary ? " Boundary" : "No Boundary"}
                    </span>
                  </label>
                  <label htmlFor="">
                    <p>GPS Coordinate Latitude</p>
                    <span>{office?.gpsLat}</span>
                  </label>
                  <label htmlFor="">
                    <p>GPS Coordinate Longitude</p>
                    <span>{office?.gpsLong}</span>
                  </label>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </RenderIf>
      <RenderIf condition={isLoading}>
        <div className="text-center">
          <Spinner color="#14458d" />
        </div>
      </RenderIf>
    </>
  );
};

export default React.memo(CustomAccordion);
