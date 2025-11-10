// CSS
import "./PerformanceToolTip.scss"

// MUI
import Tooltip from "@mui/material/Tooltip"

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"

const PerformanceToolTip = ({ text }) => {
  return (
    <Tooltip title={text} className="performanceToolTip">
        <FontAwesomeIcon icon={faCircleInfo} className="infoIcon" />
    </Tooltip>
  )
}

export default PerformanceToolTip
