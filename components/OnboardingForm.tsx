"use client"

import { User } from '@/lib/generated/prisma';
import { userSchema } from '@/lib/schema';
import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Car } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { countryList } from '@/utils/countriesList';
import { industryTypesList, roleList } from '@/utils';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { createUser } from '@/app/actions/user';

interface Props {
    name: string;
    email: string;
    image?: string;
}

export type UserDataType = z.infer<typeof userSchema>;

export const OnboardingForm = ({ name, email, image }: Props) => {

    const [pending, setPending] = useState(false);
    const form = useForm<UserDataType>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            about: "",
            name: name || "",
            email: email,
            image: image || "",
            role: "",
            industryType: "",
            country: "",
        },
    });

    const onSubmit = async (data: UserDataType) => {
        try{
            setPending(true);
            await createUser(data);
        } catch(error){
            console.log(error);
            toast.error("Something went wrong. Please try again.");
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
  <Card className="w-full max-w-sm shadow-md border border-slate-200">
    <CardHeader className="space-y-1 pb-4">
      <CardTitle className="text-lg font-semibold">Welcome to ProjectPulse!</CardTitle>
      <CardDescription>
        Let's get to know you better. Please fill out the form below to complete your onboarding.
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                </FormControl>

                <FormMessage />
            </FormItem>
          )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    value={field.value}
                >
                    <FormControl>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    </FormControl>

                    <SelectContent side="bottom"  avoidCollisions={false}>
                    {countryList.map((country) => (
                        <SelectItem
                        key={country.code}
                        value={country.name}
                        >
                        <div className="flex flex-row items-center">
                            <img
                            src={country.flag}
                            alt={country.name}
                            className="w-4 h-3"
                            />
                            <p className="pl-2">{country.name}</p>
                        </div>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
            control={form.control}
            name="industryType"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Industry Type</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <FormControl>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Industry Type" />
                    </SelectTrigger>
                    </FormControl>

                    <SelectContent side="bottom"  avoidCollisions={false}>
                    {industryTypesList.map((industry) => (
                        <SelectItem
                        key={industry}
                        value={industry}
                        >
                        {industry}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
                <FormItem className="w-full">
                <FormLabel>Role at Organisation</FormLabel>
                <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                >
                    <FormControl>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    </FormControl>

                    <SelectContent side="bottom"  avoidCollisions={false}>
                    {roleList.map((role) => (
                        <SelectItem
                        key={role}
                        value={role}
                        >
                        {role}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
          />
          </div>

          <FormField
          control={form.control}
          name="about"
          render={({field}) => (
            <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder="A short bio about you..." className='resize-none' />
                </FormControl>

                <FormMessage />
            </FormItem>
          )}
          />


          <Button type='submit' disabled={pending} className='w-full'>Submit</Button>
        </form>
      </Form>
    </CardContent>
  </Card>
</div>

  )
}
