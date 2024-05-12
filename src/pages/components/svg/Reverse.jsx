import React from 'react'
import { motion } from 'framer-motion'
const Reverse = () => {
  const delaytime = 1
  return (
    <motion.svg transition={{delay:delaytime}} animate={{rotate:`180deg`,transformOrigin:'center'}} className='reverse' viewBox="0 0 86 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path 
        initial={{scale:0}} 
        animate={{scale:1}} 
        transition={{delay:delaytime}}
        className='arrow'
        
        d="M26.2465 19.3943C27.0007 20.1364 28.0176 20.5504 29.0757 20.5461C30.1338 20.5418 31.1473 20.1195 31.8955 19.3713C32.6437 18.6232 33.0659 17.6096 33.0702 16.5516C33.0745 15.4935 32.6606 14.4766 31.9185 13.7223L19.3712 1.17495C19.2774 1.07841 19.1781 0.987456 19.0737 0.902543L19.0469 0.880817C18.9534 0.805613 18.8564 0.733752 18.7562 0.666904L18.7127 0.638493C18.6174 0.576659 18.5188 0.518167 18.4169 0.471374C18.4018 0.462581 18.3862 0.454766 18.3701 0.447977C18.2691 0.39415 18.1653 0.345619 18.0593 0.302583L18.0192 0.287542C17.9105 0.244091 17.8002 0.205653 17.6849 0.170558H17.6532C17.5417 0.137134 17.4264 0.108724 17.3072 0.0853274H17.2805C17.1618 0.0619306 17.0432 0.0452184 16.9228 0.03352H16.8995C16.7791 0.0218216 16.6571 0.0151367 16.5351 0.0151367C16.4115 0.0151367 16.2911 0.0151368 16.1708 0.03352H16.1457C16.0263 0.0448127 15.9075 0.0621038 15.7898 0.0853274H15.763C15.6444 0.108724 15.5291 0.137134 15.4154 0.170558H15.3837C15.2717 0.205653 15.1614 0.244091 15.0494 0.287542L15.0093 0.302583C14.9046 0.346034 14.801 0.394499 14.6985 0.447977L14.6517 0.471374C14.5497 0.524852 14.4528 0.583344 14.3559 0.638493L14.3124 0.666904C14.2122 0.733752 14.1152 0.805613 14.0217 0.880817L13.9932 0.902543C13.8899 0.986312 13.7912 1.07557 13.6974 1.16993L1.15176 13.7223C0.40969 14.4766 -0.00427512 15.4935 3.32964e-05 16.5516C0.00434171 17.6096 0.426574 18.6232 1.17476 19.3713C1.92294 20.1195 2.93646 20.5418 3.99454 20.5461C5.05263 20.5504 6.06955 20.1364 6.8238 19.3943L12.5243 13.6939V52.098C12.5287 56.0441 14.0982 59.8272 16.8885 62.6175C19.6787 65.4078 23.4619 66.9773 27.4079 66.9817H48.7542C49.8179 66.9817 50.8381 66.5591 51.5903 65.807C52.3425 65.0548 52.765 64.0346 52.765 62.9708C52.765 61.9071 52.3425 60.8869 51.5903 60.1347C50.8381 59.3825 49.8179 58.96 48.7542 58.96H27.4079C25.5887 58.9577 23.8446 58.2341 22.5583 56.9477C21.2719 55.6613 20.5482 53.9172 20.546 52.098V13.6939L26.2465 19.3943Z" fill="#C8C8C8" fill-opacity="0.28"/>
      <motion.path 
      transition={{delay:delaytime}}
      initial={{scale:0}} 
      animate={{scale:1}} 
      className='arrow' 
      d="M78.6512 47.5874L72.9507 53.2878V14.8837C72.9463 10.9376 71.3768 7.15449 68.5865 4.36422C65.7963 1.57394 62.0131 0.00442332 58.0671 0H36.7208C35.6571 0 34.6369 0.422573 33.8847 1.17476C33.1325 1.92694 32.71 2.94712 32.71 4.01088C32.71 5.07463 33.1325 6.09481 33.8847 6.84699C34.6369 7.59918 35.6571 8.02175 36.7208 8.02175H58.0671C59.8863 8.02396 61.6304 8.74762 62.9167 10.034C64.2031 11.3204 64.9268 13.0645 64.929 14.8837V53.2878L59.2285 47.5874C58.4743 46.8453 57.4574 46.4313 56.3993 46.4356C55.3412 46.4399 54.3277 46.8622 53.5795 47.6104C52.8313 48.3586 52.4091 49.3721 52.4048 50.4301C52.4005 51.4882 52.8144 52.5052 53.5565 53.2594L66.1038 65.8068C66.1972 65.9015 66.296 65.9908 66.3996 66.0742L66.4264 66.0959C66.52 66.1711 66.6169 66.2429 66.7172 66.3098L66.759 66.3365C66.8559 66.4 66.9545 66.4585 67.0564 66.5037L67.1016 66.527C67.2035 66.5805 67.3071 66.629 67.4141 66.6724L67.4525 66.6875C67.5611 66.7309 67.6731 66.7694 67.7867 66.8045L67.8168 66.8128C67.9305 66.8462 68.0475 66.8747 68.1661 66.8981H68.1895C68.3082 66.9214 68.4285 66.9382 68.5505 66.9499H68.5705C68.6925 66.9616 68.8162 66.9682 68.9399 66.9682C69.0635 66.9682 69.1889 66.9682 69.3109 66.9499H69.3309C69.4515 66.9387 69.5714 66.9214 69.6902 66.8981H69.7136C69.8317 66.8747 69.9487 66.8462 70.0646 66.8128L70.093 66.8045C70.2066 66.7694 70.3169 66.7309 70.4272 66.6875L70.4657 66.6724C70.5726 66.629 70.6762 66.5805 70.7782 66.527L70.825 66.5037C70.9264 66.4531 71.0251 66.3973 71.1208 66.3365L71.1642 66.3098C71.2645 66.2429 71.3614 66.1711 71.455 66.0959L71.4818 66.0792C71.5851 65.9954 71.6838 65.9061 71.7776 65.8118L84.3249 53.2644C85.0918 52.3645 85.481 51.4932 85.4766 50.4352C85.4723 49.3771 85.0501 48.3636 84.3019 47.6154C83.5537 46.8672 82.5402 46.445 81.4821 46.4407C80.424 46.4363 79.4071 46.8503 78.6529 47.5924L78.6512 47.5874Z" fill="#C8C8C8" fill-opacity="0.28"/>
    </motion.svg>

  )
}

export default Reverse