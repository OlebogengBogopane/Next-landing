import {connect}  from '@/src/dbConfig/dbConfig';
import User from '@/src/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'


connect()


export default async function POST(request) {
    try{
       const reqBody = await request.json()
      const {username, email , password} = reqBody

        console.log(reqBody);

        //check if user exist
        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error:"User already exist"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User ({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message:'User created successfully',
            sucess:true,
            savedUser
            });

    } catch(error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}