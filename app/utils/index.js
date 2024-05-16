import { supabase } from "./supabase/client";




export const Position =[
    {

        role:"Software Developer"
    },
    {
        role:"Backend Engineer" 
    },
    {
        role:"Front-end Engineer"
    }
]



export const Department = [
  {
    name:"IT Support"
  },
  {
    name:"Finance"
  },
  {
    name:"Marketing"
  },
  {
    name:"Sales"
  }
]

export const Employee = [
  {
    name: "Judah Alvin Dore",
    role: "Backend Engineer",
    image: "/person1.jpg",
  },
  {
    name: "Solomon Kanu",
    role: "Frontend Engineer",
    image: "/person2.jpg",
  },
  {
    name: "Isha Fofana",
    role: "AWS Engineer",
    image: "/person3.jpg",
  },
  {
    name: "Jacin Sebastian",
    role: "UI/UX Designer",
    image: "/person4.jpg",
  },
  {
    name: "SOS",
    role: "Cloud Engineer",
    image: "/person5.jpg",
  },
  {
    name: "SOS",
    role: "Cloud Engineer",
    image: "/person5.jpg",
  },
  {
    name: "SOS",
    role: "Cloud Engineer",
    image: "/person5.jpg",
  },
];

//create user 
export const createUser = async (
  email,
  password,
  first_name,
  last_name,
  position,
  department
) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
        position: position,
        department: department,
        role: "employee",
      },
    },
  });

  return { data, error };
};


//login user 
