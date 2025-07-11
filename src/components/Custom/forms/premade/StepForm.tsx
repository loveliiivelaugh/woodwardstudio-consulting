import { useMultiStepModal } from "@custom/providers/ModalProvider";
import { useUtilityStore } from "@store/utilityStore";
import FormContainer from "../FormContainer";
import { Typography, Box, Divider } from "@mui/material";
import { Button } from "@mui/material";
import BookingPage from "@components/pages/BookingPage";
import { CalendarMonth } from "@mui/icons-material";
import React from "react";

const StepForm = () => {
    const utilityStore = useUtilityStore();
    const { showSteps } = useMultiStepModal();

    const handleClick = () =>
        showSteps({
            steps: [
                // STEP1
                ({ next, setFormData }) => (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "-100px -100px 0 0", margin: "-24px -24px 0 0" }}>
                            <Button variant="text" color="inherit" onClick={() => utilityStore.setModal({ open: false, content: null })}>
                                x
                            </Button>
                        </Box>
                        <Typography variant="h6">
                            👋 Hey there! I'm thrilled that you're interested in working with me.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 1 }}>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => utilityStore.setModal({ open: false, content: null })}
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => next()}
                                fullWidth
                            >
                                Next
                            </Button>
                        </Box>
                    </>
                ),
                ({ next, setFormData }) => (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "-100px -100px 0 0", margin: "-24px -24px 0 0" }}>
                            <Button variant="text" color="inherit" onClick={() => utilityStore.setModal({ open: false, content: null })}>
                                x
                            </Button>
                        </Box>
                        <Typography variant="h6">
                            Can you tell me a little bit about your business?
                        </Typography>
                        {/* <Typography variant="subtitle1" color="textSecondary">
                            Is it okay if I email you about any updates or promotions? Only valueable stuff.
                            <CheckBox />
                        </Typography> */}
                        <FormContainer
                            disableHeader
                            schema={{
                                table: 'booking',
                                columns: [
                                    { name: 'name', dataType: 'text' },
                                    { name: 'email', dataType: 'text' },
                                    { name: 'phone', dataType: 'text' }
                                ]
                            }}
                            handleCancelClick={() => utilityStore.setModal({ open: false, content: null })}
                            handleSubmit={(values) => {
                                setFormData(values.value);
                                // the callback is being spread down and dynamically passed forward.
                                // I think somewhere its getting lost
                                next(
                                    // @ts-expect-error
                                {
                                    // pass things here for next step
                                    sx: {//style override
                                        slots: { //internal element selector
                                            box: (style: any) => ({//callback w/internal styles if any
                                                width: "100vw",
                                                height: 900
                                            })
                                        }
                                    },
                                } as any);
                            }}
                        />
                    </>
                ),
                // STEP2
                ({ next, formData, setFormData }) => (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "-100px -100px 0 0", margin: "-24px -24px 0 0" }}>
                            <Button variant="text" color="inherit" onClick={() => utilityStore.setModal({ open: false, content: null })}>
                                x
                            </Button>
                        </Box>
                        <Typography variant="h6">
                            Where do people go to learn more about your business?
                        </Typography>
                        <FormContainer
                            disableHeader
                            schema={{
                                table: 'booking',
                                columns: [
                                    { name: 'website', dataType: 'text' },
                                    { name: 'business_type', dataType: 'text' },
                                    { name: 'project_description', dataType: 'text' }
                                ]
                            }}
                            handleCancelClick={() => utilityStore.setModal({ open: false, content: null })}
                            handleSubmit={(values) => {
                                setFormData(values.value);
                                // @ts-expect-error
                                // the callback is being spread down and dynamically passed forward.
                                // I think somewhere its getting lost
                                next({
                                    // pass things here for next step
                                    sx: {//style overrider
                                        slots: { //internal element selector
                                            box: (style: any) => ({//callback w/internal styles if any
                                                width: 600,
                                                height: 700
                                            })
                                        }
                                    },
                                });
                            }}
                        />
                        {/* <AvailabilityCalendar employeeId={formData.Name ?? 1} /> */}
                    </>
                ),
                ({ next, formData, setFormData }) => (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "-100px -100px 0 0", margin: "-24px -24px 0 0" }}>
                            <Button variant="text" color="inherit" onClick={() => utilityStore.setModal({ open: false, content: null })}>
                                x
                            </Button>
                        </Box>
                        <Typography variant="h6">
                            What is your biggest pain point? 
                            How fast do you want to get it resolved?
                            What budget are you willing to work with?
                        </Typography>
                        <FormContainer
                            disableHeader
                            schema={{
                                table: 'booking',
                                columns: [
                                    { name: 'biggest_pain_point', dataType: 'text' },
                                    { name: 'timeline', dataType: 'text' },
                                    { name: 'budget_range', dataType: 'text' }
                                ]
                            }}
                            handleCancelClick={() => utilityStore.setModal({ open: false, content: null })}
                            handleSubmit={(values) => {
                                setFormData(values.value);
                                // @ts-expect-error
                                // the callback is being spread down and dynamically passed forward.
                                // I think somewhere its getting lost
                                next({
                                    // pass things here for next step
                                    sx: {//style overrider
                                        slots: { //internal element selector
                                            box: (style: any) => ({//callback w/internal styles if any
                                                width: "1120px",
                                                height: 700
                                            })
                                        }
                                    },
                                });
                            }}
                        />
                        {/* <AvailabilityCalendar employeeId={formData.Name ?? 1} /> */}
                    </>
                ),
                ({ next, formData, setFormData }) => (
                    <Box sx={{ width: "1120px", height: 700, overflow: "auto" }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "-100px -100px 0 0", margin: "-24px -24px 0 0" }}>
                            <Button variant="text" color="inherit" onClick={() => utilityStore.setModal({ open: false, content: null })}>
                                x
                            </Button>
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            When is the best time for us to meet?
                        </Typography>
                        <BookingPage />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => next()}
                            fullWidth
                        >
                            Next
                        </Button>
                    </Box>
                ),
                // STEP3
                ({ formData, next }) => (
                    // const [isLoading, setIsLoading] = React.useState(false);
                    // const handleConfirmed = () => {
                    //     setIsLoading(true);
                    //     setTimeout(() => {
                    //         setIsLoading(false);
                    //         next();
                    //     }, 2000);
                    // };
                    // return (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "-100px -100px 0 0", margin: "-24px -24px 0 0" }}>
                            <Button variant="text" color="inherit" onClick={() => utilityStore.setModal({ open: false, content: null })}>
                                x
                            </Button>
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            Confirm Booking Details
                        </Typography>
                        <pre>{JSON.stringify(formData, null, 2)}</pre>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Does this look right?
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => utilityStore.setModal({ open: false, content: null })}
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onClick={next}
                            >
                                Confirm
                                {/* {isLoading ? 'Confirming...' : 'Confirm'} */}
                            </Button>
                        </Box>
                    </>
                ),
                ({ formData }) => (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: "-100px -100px 0 0", margin: "-24px -24px 0 0" }}>
                            <Button variant="text" color="inherit" onClick={() => utilityStore.setModal({ open: false, content: null })}>
                                x
                            </Button>
                        </Box>
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
                        <Box sx={{ my: 2, border: '0.2px solid rgba(255,255,255,0.4)', borderRadius: 2, p: 1 }}>
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
                                3. At our meeting time, we will go over your current processes and identify areas for automation.
                            </Typography>
                            <Typography variant="body1" color="textSecondary" gutterBottom>
                                4. At the conclusion of that meeting, we will decide together on next steps.
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => utilityStore.setModal({ open: false, content: null })}
                        >
                            Close
                        </Button>
                    </>
                ),
            ]
        })

    return (
        <Button 
            size="large"
            sx={{ borderRadius: 999, textTransform: 'none', px: 4, py: 1.5 }}
            onClick={handleClick} 
            variant="contained" 
            color="primary"
        >
            Book My Free Automation Audit
        </Button>
    );
};

export default StepForm;
