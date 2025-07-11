export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export const FAQs: FAQ[] = [
  {
    category: "Registration and Access",
    question: "How to register on MOSDAC?",
    answer: "You need to fill out the 'SignUp' form on the MOSDAC portal. You will receive an email notification upon approval."
  },
  {
    category: "Registration and Access",
    question: "Can anonymous users (without username/password) download data?",
    answer: "Yes, anonymous users can download open data. For access to all other data, registration is required."
  },
  {
    category: "Registration and Access",
    question: "How to order in-situ data?",
    answer: "You need to be a registered user, log in, select 'In-situ data order,' choose your data, place the order, and sign the agreement. A download link will be provided."
  },
  {
    category: "Data Access and Download",
    question: "How to download data?",
    answer: "Registered users can download data based on their access level. General users can download archive products and certain geophysical parameters with a 3-day latency, while NRT users can access all products in near real-time."
  },
  {
    category: "Data Access and Download",
    question: "How to get near-real time data?",
    answer: "You can place a standing order for a maximum of one month through the MOSDAC portal for satellite data or in-situ data."
  },
  {
    category: "Data Access and Download",
    question: "Where is the data uploaded after ordering?",
    answer: "Ordered data is uploaded to your SFTP account at sftp://ftp.mosdac.gov.in, and you can download it using your MOSDAC portal credentials."
  },
  {
    category: "Other FAQs",
    question: "How to change password?",
    answer: "Log in, navigate to 'Change Profile,' and then select 'Password' to update your password."
  },
  {
    category: "Other FAQs",
    question: "What is MOSDAC?",
    answer: "MOSDAC is a data portal developed by ISRO that provides access to meteorological and oceanographic satellite data."
  },
  {
    category: "Other FAQs",
    question: "How to get help with MOSDAC?",
    answer: "You can contact the MOSDAC admin or explore the help/FAQ sections on the portal."
  },
  {
    category: "Other FAQs",
    question: "What is RAPID?",
    answer: "RAPID is a weather data explorer application developed by SAC, ISRO, and hosted on the India Meteorological Department (IMD) website."
  }
]; 