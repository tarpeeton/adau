
import { FC } from 'react';
import Video from './Video';
import Mission from './Mission'; // Note the corrected spelling
import Team from './Team';
import Partners from './Partners';
import Timeline from './TimeLine';
import MobileTimeLine from './MobileTimeLine'
import Invite from './Invite'
import Result from './Result'
import SomeForm from './Form'


const About: FC = () => {
 
  
  return (
    <div>
      <Video />
      <Mission />
      <Team />
      <Partners  active={false}/>
      <div className='hidden 2xl:block'>
      <Timeline />
      </div>
      <div className=' 2xl:hidden'>
        <MobileTimeLine />
      </div>
      <Invite />
      <Result />
      <SomeForm />
    </div>
  );
};

export default About;
