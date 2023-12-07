import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import {LockOutlined} from "@ant-design/icons";
import { Typography, Tooltip } from "antd";
// import { useAppDispatch,useAppSelector } from '@/redux/store';
// import {logout} from '@/redux/feature/user/userSlice'
// import {ButtonType,WordType} from "@/shared/constants/models";
import { useDispatch } from "react-redux";
import { logout } from "src/redux/features/User/userSlice";
import classes from "./dropdown.module.scss"

const { Text } = Typography

const Index = () => {
    // const {user:{user}} = useAppSelector()    
    // const dispatch = useAppDispatch()
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
    };


    return (

        <DropdownButton id="dropdown-basic-button"
        // title={`${WordType.HELLO},  
        //  ${user?.firstName} ${user?.lastName}`}
        >
            <Typography>
                <Typography className={classes.dropdown}>
                    <Typography className={`${classes.dropdownInner} rounded-top`}>
                        <Typography className={classes.dropdownInnerText}>
                            <Text>Test</Text>
                        </Typography>
                        <Typography>
                            <Text>Test</Text>
                            <Text>Test</Text>
                        </Typography>

                    </Typography>
                    <Typography className={`${classes.dropdownOuter} rounded-bottom`}>
                        <Text
                        // onClick={()=>dispatch(logout())} 
                        // type={ButtonType.SUCCESS}
                        onClick={logoutHandler}
                        >Çıxış</Text>
                        <Tooltip title="Change password">
                            <Typography className={classes.dropdownOuterIcon}>
                                {/* <LockOutlined /> */} Icon
                            </Typography>
                        </Tooltip>
                    </Typography>
                </Typography>
            </Typography>
        </DropdownButton>

    );
};

export default Index;