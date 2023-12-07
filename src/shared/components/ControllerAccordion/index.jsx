import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./ControllerAccordion.scss";
import { ArrowRight } from "../../../assets/svgs";
const ControllerAccordion = ({
  children,
  title,
  bgColor,
  role,
  border,
  icon,
}) => {
  return (
    <div className="ControllerAccordion">
      <Accordion sx={{ background: bgColor, border: `1px solid ${border}` }}>
        <AccordionSummary
          expandIcon={<ArrowRight />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="Typography_Header">
            {icon}
            <div c>
              <p>{role}</p>
              <h1>{title}</h1>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ControllerAccordion;
