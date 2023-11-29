"use client";

import Image from 'next/image';
import mobile from '/src/assets/images/illustration-sign-up-mobile.svg';
import checkmark from '/src/assets/images/icon-list.svg';
import desktop from '/src/assets/images/illustration-sign-up-desktop.svg';
import { useFormik } from 'formik';
import Success from './success';
import { useState } from 'react';

export default function Home() {
  const [success, setSuccess] = useState(false);

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Valid email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Valid email required';
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: values => {
      setSuccess(true);
    }
  });

  return (
    <>
   {!success &&  <div className="md:bg-slate-900 md:flex md:items-center md:justify-center md:h-screen">
    <section className='bg-white md:w-[700px] lg:w-[900px] md:flex md:flex-row-reverse md:items-center md:rounded-2xl md:p-8 md:gap-8'>
      <div className='md:hidden'>
        <Image src={mobile} alt="Newsletter" height={250} width={768}/>
      </div>

      <div className='hidden md:block md:flex-1'>
        <Image src={desktop} alt="Newsletter" height={250} width={768}/>
      </div>

      <div className='py-8 px-4 md:flex-1'>
        <h1 className='text-slate-900 font-bold text-4xl lg:text-5xl mb-8'>Stay updated!</h1>
        <p className='mb-8'>Join 60,000+ product managers receiving monthly updates on:</p>

        <ul className='flex flex-col gap-4 mb-8'>
          <li className='flex items-start gap-4'>
            <Image src={checkmark} height={20} width={20} alt='checkmark'  />
            Product discovery and building what matters
          </li>
          <li className='flex items-start gap-4'>
            <Image src={checkmark} height={20} width={20} alt='checkmark'  />
            Measuring to ensure updates are a success
          </li>
          <li className='flex items-start gap-4'>
            <Image src={checkmark} height={20} width={20} alt='checkmark'  />
            And much more!
          </li>
        </ul>

        <form onSubmit={formik.handleSubmit} autoComplete='off'>
          <article className='flex items-center justify-between'>
          <label htmlFor="email" className='block text-slate-900 font-bold text-sm mb-2'>Email Address</label>
          {formik.errors.email ? <div className='text-red-500 text-sm mb-2 text-font-bold'>{formik.errors.email}</div> : null}
          </article>
          <input type="email" id="email" placeholder="email@company.com" className={`w-full border rounded-lg py-3 px-4 mb-4 outline-none focus:border-slate-700 ${formik.errors.email && "bg-rose-100 border-rose-400 focus:border-rose-400"}`} value={formik.values.email} onChange={formik.handleChange}/>
          <button onClick={formik.handleSubmit} type="submit" style={{backgroundColor: "hsl(234, 29%, 20%)"}} className='py-3 px-4 w-full text-white font-bold hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-400'>Subscribe to monthly newsletter</button>
        </form>
      </div>

    </section>
    </div>}

    {success && <Success email={formik.values.email} setSuccess={setSuccess} />}
    </>
  )
}
