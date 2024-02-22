import {connect} from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/src/helpers/mailer";


connect()


export async function POST (request) {
    try {
        const reqBody = await request.jsoon()
        const {username, email, password} = reqBody

        console.log(reqBody);

        //checks if user exists
        const user = await User.findOne({email});

    }
    catch (error){
        console.log(error);
    }
}