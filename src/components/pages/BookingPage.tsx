// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { List, ListItem, ListItemButton } from '@mui/material';

// export function BasicDateCalendar() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar onChange={(date) => console.log(date)} sx={{ width: 400, height: "100%" }} />
//     </LocalizationProvider>
//   );
// }

// const BookingPage = () => {
//     return (
//         <div>
//             <h1>Booking Page</h1>
//             <BasicDateCalendar />
//             <List>
//                 <ListItemButton></ListItemButton>
//             </List>
//         </div>
//     );
// };

// export default BookingPage;
import { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  Typography,
  Paper,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
  Grid2 as Grid,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { motion } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarMonth, TimeToLeave } from '@mui/icons-material';
import logo from "@api/../assets/woodward-studio-logo.jpg";
import FormContainer from '@components/Custom/forms/FormContainer';

import { useUtilityStore } from '@utilities/store';

const times = [
  '5:15pm', '5:30pm', '5:45pm', '6:00pm', '6:15pm',
  '6:30pm', '6:45pm', '7:00pm', '7:15pm', '7:30pm', '7:45pm',
];

const TimeSelector = ({ selectedTime, setSelectedTime }: any) => (
  <List sx={{ height: 310, overflowY: 'auto', width: '100%', px: 1 }}>
    {times.map((time) => (
      <ListItemButton
        key={time}
        selected={selectedTime === time}
        onClick={() => setSelectedTime(time)}
        sx={{
          my: 1,
          borderRadius: 2,
          border: '1px solid #444',
          color: '#ccc',
          backgroundColor: selectedTime === time ? '#1e1e1e' : '#111',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#222',
          },
        }}
        component={motion.div}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Typography variant="body1" sx={{ pl: 1 }}>{time}</Typography>
      </ListItemButton>
    ))}
  </List>
);

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      // minHeight="100vh"
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="flex-start"
      gap={4}
      p={4}
      bgcolor="#121212"
      color="#fff"
    >
      {/* <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1a1a1a', maxWidth: 300 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="Woodward Studio Logo" style={{ width: 180, height: 180 }} />
        </Box>
        <Divider sx={{ bgcolor: '#444' }} />
        <Typography variant="h6" my={2} color="text.secondary">
          Woodward Studio
        </Typography>
        <Typography variant="h4" gutterBottom>
          15 Minute Consultation
        </Typography>
        <Box display="flex" alignItems="center" gap={1} color="#ccc" mb={3}>
          <TimeToLeave />
          <Typography variant="body2">15 minutes</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" bgcolor="#111" p={1} borderRadius={1}>
          <Button variant="text" color="primary" size="small">Cookie Settings</Button>
          <Button variant="text" color="primary" size="small">Report Abuse</Button>
        </Box>
      </Paper> */}

      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1a1a1a' }}>
        <Typography variant="h6" gutterBottom>
          Select a Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            sx={{
              '& .MuiPickersDay-root': { color: '#ccc' },
              '& .Mui-selected': { backgroundColor: '#1976d2 !important' },
              '& .MuiPickersCalendarHeader-label': { color: '#fff' },
              '& .MuiPickersArrowSwitcher-root button': { color: '#ccc' },
            }}
          />
        </LocalizationProvider>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, minWidth: 200, backgroundColor: '#1a1a1a' }}>
        <Typography variant="h6" gutterBottom>
          Select a Time
        </Typography>
        <TimeSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </Paper>
{/* 
      <Paper elevation={3} sx={{ p: 3, minWidth: 320, backgroundColor: '#1a1a1a' }}>
        <StepForm />
        <Typography variant="h6" gutterBottom>
          Pre-Consult Form
        </Typography>
        <FormContainer
          schema={{
            table: 'booking',
            columns: [
              { name: 'name', dataType: 'text' },
              { name: 'email', dataType: 'text' },
              { name: 'phone', dataType: 'text' },
              { name: 'website', dataType: 'text' },
              { name: 'business_type', dataType: 'text' },
              { name: 'project_description', dataType: 'text' },
              { name: 'biggest_pain_point', dataType: 'text' },
              { name: 'timeline', dataType: 'text' },
              { name: 'budget_range', dataType: 'text' },
              { name: 'date', dataType: 'date' },
              { name: 'time', dataType: 'text' },
            ],
          }}
        />
      </Paper> */}
    </Box>
  );
}


const StepForm = () => {
  const utilityStore = useUtilityStore();
  const [viewIndex, setViewIndex] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const closeModal = () => utilityStore.setModal({ open: false, content: null });

  const next = () => setViewIndex((prev) => prev + 1);
  const prev = () => setViewIndex((prev) => Math.max(prev - 1, 0));

  const commonCloseButton = (
    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "-24px -24px 0 0" }}>
      <Button variant="text" color="inherit" onClick={closeModal}>
        x
      </Button>
    </Box>
  );

  const views = [
    // View 0
    <>
      {commonCloseButton}
      <Typography variant="h6">
        👋 Hey there! I'm thrilled that you're interested in working with me.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, gap: 1 }}>
        <Button variant="outlined" color="error" onClick={closeModal} fullWidth>
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" onClick={next} fullWidth>
          Next
        </Button>
      </Box>
    </>,

    // View 1
    <>
      {commonCloseButton}
      <Typography variant="h6">Can you tell me a little bit about your business?</Typography>
      <FormContainer
        disableHeader
        schema={{
          table: "booking",
          columns: [
            { name: "name", dataType: "text" },
            { name: "email", dataType: "text" },
            { name: "phone", dataType: "text" },
          ],
        }}
        handleCancelClick={closeModal}
        handleSubmit={(values) => {
          setFormData((prev: any) => ({ ...prev, ...values.value }));
          next();
        }}
      />
    </>,

    // View 2
    <>
      {commonCloseButton}
      <Typography variant="h6">Where do people go to learn more about your business?</Typography>
      <FormContainer
        disableHeader
        schema={{
          table: "booking",
          columns: [
            { name: "website", dataType: "text" },
            { name: "business_type", dataType: "text" },
            { name: "project_description", dataType: "text" },
          ],
        }}
        handleCancelClick={closeModal}
        handleSubmit={(values) => {
          setFormData((prev: any) => ({ ...prev, ...values.value }));
          next();
        }}
      />
    </>,

    // View 3
    <>
      {commonCloseButton}
      <Typography variant="h6">
        What is your biggest pain point? How fast do you want to get it resolved? What budget are
        you willing to work with?
      </Typography>
      <FormContainer
        disableHeader
        schema={{
          table: "booking",
          columns: [
            { name: "biggest_pain_point", dataType: "text" },
            { name: "timeline", dataType: "text" },
            { name: "budget_range", dataType: "text" },
          ],
        }}
        handleCancelClick={closeModal}
        handleSubmit={(values) => {
          setFormData((prev: any) => ({ ...prev, ...values.value }));
          next();
        }}
      />
    </>,

    // View 4
    <Box sx={{ width: "1120px", height: 700, overflow: "auto" }}>
      {commonCloseButton}
      <Typography variant="h6" gutterBottom>
        When is the best time for us to meet?
      </Typography>
      <BookingPage />
      <Button variant="outlined" color="secondary" onClick={next} fullWidth>
        Next
      </Button>
    </Box>,

    // View 5 – Confirmation
    <>
      {commonCloseButton}
      <Typography variant="h6" gutterBottom>
        Confirm Booking Details
      </Typography>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Does this look right?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" color="error" onClick={closeModal} fullWidth>
          Cancel
        </Button>
        <Button variant="outlined" color="secondary" fullWidth onClick={next}>
          Confirm
        </Button>
      </Box>
    </>,

    // View 6 – Final Message
    <>
      {commonCloseButton}
      <Typography variant="h6" gutterBottom>
        Meeting Confirmed
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Meeting scheduled for {formData.Date} at {formData.Time} with {formData.Name}.
      </Typography>
      <CalendarMonth sx={{ fontSize: 50, mb: 2 }} color="secondary" />
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Thank you for booking a meeting with me. I will be in touch with you soon.
      </Typography>
      <Divider />
      <Box sx={{ my: 2, border: "0.2px solid rgba(255,255,255,0.4)", borderRadius: 2, p: 1 }}>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          What to expect:
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          1. Expect an email within 24 hours to confirm the details of your meeting.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          2. I will send you a link for a Zoom Meeting at our scheduled time.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          3. At our meeting time, we will go over your current processes and identify areas for
          automation.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          4. At the conclusion of that meeting, we will decide together on next steps.
        </Typography>
      </Box>
      <Button variant="outlined" color="secondary" fullWidth onClick={() => setViewIndex(0)}>
        Close
      </Button>
    </>,
  ];

  return (
    <Box sx={{ p: 3, height: "100vh", overflowY: "auto", alignContent: "center", justifyContent: "center" }}>
      <Grid container>
        <Grid size={6} sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1a1a1a', maxWidth: 300 }}>
            <Box display="flex" justifyContent="center" mb={2}>
              <img src={logo} alt="Woodward Studio Logo" style={{ width: 180, height: 180 }} />
            </Box>
            <Divider sx={{ bgcolor: '#444' }} />
            <Typography variant="h6" my={2} color="text.secondary">
              Woodward Studio
            </Typography>
            <Typography variant="h4" gutterBottom>
              15 Minute Consultation
            </Typography>
            <Box display="flex" alignItems="center" gap={1} color="#ccc" mb={3}>
              <TimeToLeave />
              <Typography variant="body2">15 minutes</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" bgcolor="#111" p={1} borderRadius={1}>
              <Button variant="text" color="primary" size="small">Cookie Settings</Button>
              <Button variant="text" color="primary" size="small">Report Abuse</Button>
            </Box>
          </Paper>
        </Grid>
        <Grid size={6}>
          {views[viewIndex]}
        </Grid>
      </Grid>
    </Box>
  )

  return views[viewIndex] || (
    <Button
      size="large"
      sx={{ borderRadius: 999, textTransform: "none", px: 4, py: 1.5 }}
      onClick={() =>
        utilityStore.setModal({
          open: true,
          content: <Box sx={{ p: 3 }}>{views[viewIndex]}</Box>,
        })
      }
      variant="contained"
      color="primary"
    >
      Book My Free Automation Audit
    </Button>
  );
};

export { StepForm };
