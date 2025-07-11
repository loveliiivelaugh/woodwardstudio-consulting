import { Box, Fab  } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import ReusablePopover from "../ReusablePopover/ReusablePopover";
import Chat from "./Chat";
import ChatView from "./ChatView";
import { useChatStore } from "../../../utilities/store";
import React from "react";


const FloatingChat = (
    props?: 
    { 
        location?: string
        tools?: any[]
        handleCameraClick?: () => void
        children?: (_: any, toggle: () => void) => React.ReactNode | any
        sx?: any
    }
) => {
    const chatStore = useChatStore(); // FloatingChat is going to have its own chatStore for now
    return (
        <ReusablePopover
            popoverContent={(_: any, toggle: (open?: boolean) => void) => (
                <Box sx={(theme) => ({ 
                    height: 600, 
                    width: 400, 
                    ...props?.sx && props.sx(theme) 
                })}>
                    <ChatView chatStore={chatStore} />
                    {/* {console.log("popoverProps: ", toggle, _, "") as any}
                    <Chat 
                        chatStore={chatStore} 
                        {...props}
                        handleCameraClick={() => Promise
                            .all([
                                toggle(),
                                props?.handleCameraClick
                                    ? props.handleCameraClick()
                                    : () => {},
                                setTimeout(() => toggle(true), 5000)
                            ]
                            .map(async (fn) => await new Promise(resolve => setTimeout(() => resolve(fn), 1000))))
                        }
                    /> */}
                </Box>
            )}
        >
            {/* {props?.children && props.children} */}
            {(_: any, toggle: () => void) => (
                <Fab color="primary" aria-label="add" onClick={toggle}>
                    <AddIcon />
                </Fab>
            )}
        </ReusablePopover>
    );
};

export default FloatingChat;
