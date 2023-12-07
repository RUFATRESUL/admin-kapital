import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./StepsAccordion.scss";
import { ArrowRight } from "../../../assets/svgs";
const StepsAccordion = ({ children, title }) => {
  return (
    <div className="StepsAccordion">
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowRight />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default StepsAccordion;
