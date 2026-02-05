import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Real enrollment data - filtered and deduplicated
const enrollments = [
  {
    email: 'cheyennetdc@gmail.com',
    parentName: 'Cheyenne Gregory',
    phone: '903-530-2261',
    address: '104 Hutto St. Troup, TX 75789',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-15'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Lakyn Gregory', age: 2, birthday: '8/11/23', sex: 'Female', school: 'Growing Stick', classroom: '2A - Ms. Emilee', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'seliamelissaperez@gmail.com',
    parentName: 'Selia Perez',
    phone: '9033636838',
    address: '15201 County Road 1125 Tyler Tx 75703',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-15'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Ariana', age: 2, birthday: '05/30/2023', sex: 'Female', school: 'Tyler Christian Preschool', classroom: null, shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'jaceyallyn97@gmail.com',
    parentName: 'Jacey Keener',
    phone: '9038559558',
    address: '1623 Waterton Cir Whitehouse Tx 75791',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-16'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Parker Keener', age: 3, birthday: '03/25/2022', sex: 'Male', school: 'Tyler Christian Preschool', classroom: "Younger 3's", shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'maddox_daisha@yahoo.com',
    parentName: 'Daisha Moore',
    phone: '3182543144',
    address: '2830 W Grande Blvd Tyler, TX',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-16'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Timothy Moore III', age: 3, birthday: '10/16', sex: 'Male', school: 'New Life Early Education Center', classroom: 'n/a', shirtSize: 'xSmall', gummyBears: true, allergies: 'Dairy/milk' }
    ]
  },
  {
    email: 'barak2emi@gmail.com',
    parentName: 'Woyengi Isenah',
    phone: '2674370466',
    address: null,
    package: 'Plan B - Pay in Full',
    amount: 450,
    status: 'active',
    enrolledDate: new Date('2025-09-17'),
    lastPayment: new Date('2025-09-17'),
    children: [
      { name: 'Ebiere Festus', age: 3, birthday: '01/07', sex: 'Female', school: 'New Life Education Center', classroom: 'E1', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'allisongracecalderon@gmail.com',
    parentName: 'Allison Calderon',
    phone: '9032538949',
    address: '22160 CR 181 Bullard, TX 75757',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-17'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Harper Calderon', age: 4, birthday: '01/21/2021', sex: 'Female', school: 'The Growing Stick', classroom: 'Pre-K', shirtSize: 'Small', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'leslie.guzman1017@yahoo.com',
    parentName: 'Leslie Guzman',
    phone: '9037870959',
    address: '4010 Suel Drive',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-17'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Eva Amelia Vasquez', age: 3, birthday: '08/02/2022', sex: 'Female', school: 'Tyler Kindercare', classroom: 'Threes B', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'prestonmiller16@icloud.com',
    parentName: 'Preston Miller',
    phone: '903-920-6285',
    address: '9595 E Ivy Drive, Tyler, Texas, 75709',
    package: 'Plan B - Pay in Full',
    amount: 450,
    status: 'active',
    enrolledDate: new Date('2025-09-19'),
    lastPayment: new Date('2025-09-19'),
    children: [
      { name: 'Sophia Miller', age: 3, birthday: '3-23-22', sex: 'Female', school: 'The Growing Stick', classroom: "3's", shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'teijahj5@gmail.com',
    parentName: 'Teijah Jones',
    phone: '9039418071',
    address: '8325 Garrett Dr Tyler Tx, 75703',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-22'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: "Xo'Loni Williams", age: 2, birthday: '02/09/23', sex: 'Female', school: 'New Life Early Education', classroom: 'D2', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'jen_kirk@hotmail.com',
    parentName: 'Jennifer Kirkpatrick',
    phone: '9032168630',
    address: '7608 Laurel Springs Ln Tyler, TX 75703',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-22'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Jaxon Kirkpatrick', age: 4, birthday: 'March 10, 2021', sex: 'Male', school: 'New Life Early Education', classroom: 'Ms. Taylor, Prek', shirtSize: 'Small', gummyBears: true, allergies: 'citrus' }
    ]
  },
  {
    email: 'juliennebroussard@yahoo.com',
    parentName: 'Julienne Houston',
    phone: '3377819701',
    address: '1305 Luann Lane',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-24'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Jace Houston', age: 2, birthday: '6/9/2023', sex: 'Male', school: 'Stepping Stone', classroom: 'Kayla B', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'kareymcpheemoore@gmail.com',
    parentName: 'Karey Moore',
    phone: '2544590602',
    address: 'P.O. Box 204',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-25'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Justice Winters', age: 3, birthday: '6-6-2022', sex: 'Female', school: 'Bullard Early Education', classroom: 'Not sure', shirtSize: 'xSmall', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'demi.folmar@yahoo.com',
    parentName: 'Demi Thomas',
    phone: '9032791716',
    address: '11060 FM 2868',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-26'),
    lastPayment: new Date('2026-01-26'),
    children: [
      { name: 'Ruby Thomas', age: 2, birthday: '05/27/24', sex: 'Female', school: 'New Life Early Education', classroom: 'D2', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'hurleysydney@yahoo.com',
    parentName: 'Sydney Hurley',
    phone: '9362298823',
    address: '402 Brookside Dr',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-29'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Hattie Terry', age: 2, birthday: '09/21/2023', sex: 'Female', school: 'BEE', classroom: 'Room 7', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'littletree1020@yahoo.com',
    parentName: 'Alexandra Blackmon',
    phone: '9404449528',
    address: '445 San Saba St',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-09-29'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Addilynn Dever', age: 3, birthday: '08-02-2022', sex: 'Female', school: 'New Life Early Education', classroom: 'E-1', shirtSize: 'xSmall', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'jordantraber@gmail.com',
    parentName: 'Jordan Saavedra',
    phone: '3616497383',
    address: '20222 Deer Hollow Dr Bullard TX 75757',
    package: 'Plan A - AutoPay',
    amount: 75,
    status: 'active',
    enrolledDate: new Date('2025-10-01'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Kevy Saavedra', age: 2, birthday: '9/16/2023', sex: 'Male', school: 'Tyler Christian Preschool', classroom: 'Young 2s', shirtSize: '4T', gummyBears: true, allergies: null },
      { name: 'Lilia Saavedra', age: 2, birthday: '9/16/2023', sex: 'Female', school: 'Tyler Christian Preschool', classroom: 'Young 2s', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'mackenziehwatts@gmail.com',
    parentName: 'Mackenzie Bevill',
    phone: '8324827232',
    address: '2980 County Road 3802',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-03'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Mackenzie Bevill Jr', age: 4, birthday: '5/11/2021', sex: 'Male', school: 'New Life EEC', classroom: 'Pre K B', shirtSize: 'xSmall', gummyBears: true, allergies: 'Penicillin' }
    ]
  },
  {
    email: 'laurenreidmalone@gmail.com',
    parentName: 'Lauren Malone',
    phone: '9035703198',
    address: '256 County Road 4925',
    package: 'Plan B - Pay in Full',
    amount: 450,
    status: 'active',
    enrolledDate: new Date('2025-10-03'),
    lastPayment: new Date('2025-10-03'),
    children: [
      { name: 'Navy', age: 3, birthday: 'July 19, 2022', sex: 'Female', school: 'New Life Early Education', classroom: 'Mrs Heather', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'smumphrey18@gmail.com',
    parentName: 'ShaKendra Mumphrey',
    phone: '9033305899',
    address: '12005 Sycamore Street Tyler TX 75704',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-07'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Kenslie Stevenson', age: 2, birthday: '01/13/2023', sex: 'Female', school: 'The Growing Stick', classroom: 'Elizabeth', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'ksnixon88@gmail.com',
    parentName: 'Kendall Anderson',
    phone: '9037808678',
    address: '15222 Northwest Rd Whitehouse, TX 75791',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-07'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Cole Anderson', age: 3, birthday: '8/6/22', sex: 'Male', school: 'Stepping Stone', classroom: 'Ms. Carol', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'ajacquez07@gmail.com',
    parentName: 'Aubrey Atkinson',
    phone: '9039529603',
    address: '3131 Bracken Dr',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-08'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Neecie Atkinson', age: 3, birthday: '11/11/21', sex: 'Female', school: 'Early Steps Bilingual Academy', classroom: 'Mrs. Susie', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'abel.ford@yahoo.com',
    parentName: 'Abbie Treat',
    phone: '903-521-4534',
    address: '3211 Timberlane Drive Tyler, TX 75701',
    package: 'Plan B - Pay in Full',
    amount: 450,
    status: 'active',
    enrolledDate: new Date('2025-10-09'),
    lastPayment: new Date('2025-10-09'),
    children: [
      { name: 'Vivian Vela', age: 3, birthday: '06/01/2022', sex: 'Female', school: 'Stepping Stones', classroom: 'Mrs. Keisha', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'mbeth84@aol.com',
    parentName: 'Marybeth Wade',
    phone: '2145353451',
    address: '2234 Byrd Rd Jacksonville, Tx 75766',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-10'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Finnley Wade', age: 3, birthday: '03/01/22', sex: 'Female', school: 'MRS Ruth', classroom: null, shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'skpavlicek@gmail.com',
    parentName: 'Samantha Pavlicek',
    phone: '2242775045',
    address: '20220 Roebuck Bullard, TX 75757',
    package: 'Plan B - Pay in Full',
    amount: 450,
    status: 'active',
    enrolledDate: new Date('2025-10-13'),
    lastPayment: new Date('2025-10-13'),
    children: [
      { name: 'Halas Pavlicek', age: 3, birthday: '09/19/2022', sex: 'Male', school: 'Stepping Stone', classroom: 'Miss Carol', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'michaladashley@gmail.com',
    parentName: 'Michala Ashley',
    phone: '9035705586',
    address: '7334 Willow Creek Dr',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-14'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Kyle', age: 3, birthday: '12/10/2021', sex: 'Male', school: 'Stepping Stone', classroom: 'Ms. Pat (3-4)', shirtSize: 'xSmall', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'xiongwei75@gmail.com',
    parentName: 'Wei Xiong',
    phone: '4303513008',
    address: '3206 Pebblebrook Cir Tyler TX 75707',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-14'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Leo Xiong', age: 2, birthday: '03/20/2023', sex: 'Male', school: 'Stepping Stone School', classroom: 'Miss. Kayla B', shirtSize: '3T', gummyBears: true, allergies: 'Allergy to Milk' }
    ]
  },
  {
    email: 'maryellenharwell23@gmail.com',
    parentName: 'Mary Billingsley',
    phone: '9039218154',
    address: '18871 Bur Oak Flint Tx 75762',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-16'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Katana Harwell', age: 2, birthday: '01/17/2023', sex: 'Female', school: 'New Life Early Education Daycare', classroom: 'D3', shirtSize: '3T', gummyBears: true, allergies: 'cats and dogs and eczema' }
    ]
  },
  {
    email: 'en222873@gmail.com',
    parentName: 'Elizabeth Navarro',
    phone: '9039049031',
    address: '519 E Dixie Lane Tyler Tx 75706',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-16'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Emberlynn Rose Sotelo', age: 3, birthday: '01132022', sex: 'Female', school: 'Kinder Care', classroom: 'Toddler', shirtSize: 'Small', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'lihily@yahoo.com',
    parentName: 'Cassidy Barbee',
    phone: '9036465708',
    address: '5622 Andover Dr',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-18'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Lincoln Barbee', age: 2, birthday: '09/27/2023', sex: 'Male', school: 'Kinder Care Tyler', classroom: null, shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'nick.cogdill@gmail.com',
    parentName: 'Nick Cogdill',
    phone: '9033439287',
    address: '15542 CR 178 Unit J110 Tyler Tx 75703',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-19'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Archie Cogdill', age: 2, birthday: '2/14/23', sex: 'Male', school: 'Early Steps Bilingual Academy', classroom: 'Jazmine', shirtSize: '3T', gummyBears: false, allergies: null }
    ]
  },
  {
    email: 'jriversnch@yahoo.com',
    parentName: 'Jamie Rivers',
    phone: '903-279-5750',
    address: '2824 Juniper Ln. Tyler, TX 75701',
    package: 'Plan A - AutoPay',
    amount: 75,
    status: 'active',
    enrolledDate: new Date('2025-10-20'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Jameson Rivers', age: 2, birthday: '12/6/2022', sex: 'Male', school: 'Early Steps Bilingual Academy', classroom: 'Ms. Jasmin', shirtSize: '4T', gummyBears: true, allergies: null },
      { name: 'Walker Rivers', age: 2, birthday: '12/6/2022', sex: 'Female', school: 'Early Steps Bilingual Academy', classroom: 'Ms. Jasmin', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'emilyharp023@gmail.com',
    parentName: 'Emily Norton',
    phone: '8707155949',
    address: '17805 State Highway 155 S Flint TX 75762',
    package: 'Plan A - AutoPay',
    amount: 75,
    status: 'active',
    enrolledDate: new Date('2025-10-26'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Evelyn Norton', age: 3, birthday: '12/7/21', sex: 'Female', school: 'The Growing Stick', classroom: '3', shirtSize: 'xSmall', gummyBears: true, allergies: null },
      { name: 'Eden Norton', age: 2, birthday: '2/20/23', sex: 'Female', school: 'The Growing Stick', classroom: '2', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'n.whittaker@outlook.com',
    parentName: 'Nicole Whittaker',
    phone: '210-865-2712',
    address: '21838 Mixon Rd. Troup, TX 75789',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-28'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Henryk Whittaker', age: 3, birthday: '8/14/22', sex: 'Male', school: 'Stepping Stone', classroom: 'Ms. Sandra', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'josephjacks@gmail.com',
    parentName: 'Joseph and Erika Jacks',
    phone: '903-372-0366',
    address: '138 Nueces Circle, Bullard Tx 75757',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-10-29'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Stella Jacks', age: 2, birthday: '09/26/23', sex: 'Female', school: 'Early Steps Bilingual', classroom: 'Ms Emily', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'morgallys@gmail.com',
    parentName: 'Morgan Priddy',
    phone: '9037071545',
    address: '2938 S Donnybrook Ave',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-03'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Collyns Priddy', age: 2, birthday: '05/15/23', sex: 'Female', school: 'Early Steps Bilingual Academy', classroom: "Ms.Emily's", shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'sydneyjhorton@gmail.com',
    parentName: 'Sydney Horton',
    phone: '8303879530',
    address: '3704 Cottage Park Circle. Tyler, TX 75707',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-03'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Riley French', age: 3, birthday: '09/26/22', sex: 'Male', school: 'Stepping Stone', classroom: 'Sandra', shirtSize: '2T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'curdadriawarren@gmail.com',
    parentName: 'CurDadria Warren',
    phone: '9039206062',
    address: '11170 CR 167 Unit 119 Tyler, Tx 75703',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-07'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Kyslie Warren', age: 3, birthday: '05/17/2022', sex: 'Female', school: 'New Life Early Education', classroom: 'E2', shirtSize: '4T', gummyBears: true, allergies: 'Allergy to Dairy' }
    ]
  },
  {
    email: 'brilemmon@gmail.com',
    parentName: 'Brianne Koch',
    phone: '903-431-5604',
    address: '1859 Frostwood Dr Tyler,Tx 75703',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-13'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Sadie', age: 5, birthday: '10/29/2020', sex: 'Female', school: 'Stepping Stones', classroom: 'Ms. Lexie Pre-K', shirtSize: 'xSmall', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'kphardy93@gmail.com',
    parentName: 'Kayla Ewalt',
    phone: '512-289-9383',
    address: '2425 Live Oak Street Jacksonville, TX 75766',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-13'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Harper Ewalt', age: 2, birthday: '10/17/2023', sex: 'Female', school: 'Methodist Readiness School', classroom: "Young Two's", shirtSize: '4T', gummyBears: false, allergies: null }
    ]
  },
  {
    email: 'chelseataylour@gmail.com',
    parentName: 'Chelsea Sattler',
    phone: '2144032028',
    address: '1539 Skidmore Lane',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-13'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Fallon', age: 3, birthday: '11/01/2022', sex: 'Female', school: 'Stepping Stone', classroom: 'Me. Carol', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'juancarlosmadadelo@outlook.com',
    parentName: 'Juan C Magdaleno',
    phone: '9039541466',
    address: '218 Hall Ave',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-16'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Celeste Magdaleno', age: 5, birthday: '10/21/2021', sex: 'Female', school: 'Bullard Early Education', classroom: "Ms Sherry's", shirtSize: 'Medium', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'devyndarr011@aol.com',
    parentName: 'Devyn Parson',
    phone: '903-522-9320',
    address: '259 Cr. 4220 Jacksonville, Tx',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-17'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Hazel Parson', age: 3, birthday: '11/6/2022', sex: 'Female', school: 'Methodist Readiness School', classroom: 'Ruth', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'claytonhughes96@gmail.com',
    parentName: 'Jolie Hughes',
    phone: '9033931430',
    address: '111 Cody St Rusk, TX 75785',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-17'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Hazel Hughes', age: 2, birthday: '10/5/2023', sex: 'Female', school: 'Methodist Readiness School', classroom: 'Aracely', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'dearmiamore@yahoo.com',
    parentName: 'Erin Groom/Jordan Tolleson',
    phone: '9035308530',
    address: '108 Stacy Dr Whitehouse',
    package: 'Plan B - Pay in Full',
    amount: 450,
    status: 'active',
    enrolledDate: new Date('2025-11-18'),
    lastPayment: new Date('2025-11-18'),
    children: [
      { name: 'Sunny Tolleson', age: 4, birthday: '11/2/2021', sex: 'Female', school: 'The Growing Stick', classroom: 'Miss Elizabeth', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'alexis.ramos.20.12@gmail.com',
    parentName: 'Alexis Hicks',
    phone: '903-477-1872',
    address: '625 Papillion Rd Unit 4 Bullard, TX 75757',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-11-20'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Esayah Hicks', age: 4, birthday: '2/9/2021', sex: 'Male', school: 'New Life Early Education', classroom: 'Pre-K B', shirtSize: 'xSmall', gummyBears: true, allergies: 'Peanuts, legumes, soy' }
    ]
  },
  {
    email: 'karleydavis555@yahoo.com',
    parentName: 'Karley Dowdy',
    phone: '9038513455',
    address: '11391 County Road 1141',
    package: 'Plan A - AutoPay',
    amount: 75,
    status: 'active',
    enrolledDate: new Date('2025-11-27'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Gunner Dowdy', age: 2, birthday: '10/20/2023', sex: 'Male', school: 'Kindercare', classroom: 'Two B', shirtSize: '3T', gummyBears: true, allergies: null },
      { name: 'Asher Dowdy', age: 2, birthday: '10/20/2023', sex: 'Male', school: 'Kindercare', classroom: 'Two B', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'austin@brianchinnteam.com',
    parentName: 'Austin McFarland',
    phone: '9037053341',
    address: null,
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-12-05'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Theodore', age: 4, birthday: '08/03/2021', sex: 'Male', school: 'New Life - HWY 69 Tyler', classroom: 'Mrs. Taylor - 4T / 5T', shirtSize: 'Small', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'davenportkateamanda@gmail.com',
    parentName: 'Amanda Davenport',
    phone: '9096417012',
    address: '414 Whitaker St',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-12-07'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Lainey Davenport', age: 2, birthday: 'November 20, 2023', sex: 'Female', school: 'Bullard Early Education', classroom: 'Room 7', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'guevarameghan@yahoo.com',
    parentName: 'Meghan Balderrama',
    phone: '9039410697',
    address: '2817 Bateman Ave',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-12-08'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Genevieve Abbott', age: 4, birthday: '06/19/2021', sex: 'Female', school: 'Tyler Christian Preschool', classroom: 'Pre-K 1', shirtSize: 'xSmall', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'd.c.haze14@gmail.com',
    parentName: 'Travis and Dakotah Hardy',
    phone: '8159044247',
    address: '1109 Brook Hollow Dr',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-12-15'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Weston Hardy', age: 2, birthday: '10/21/2023', sex: 'Male', school: 'Methodist Readiness School', classroom: 'Ms. Aracely', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'kgracie2000@gmail.com',
    parentName: 'Gracie McKeethan',
    phone: '903-508-1942',
    address: '4405 County Road 3707 Bullard TX 75757',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-12-17'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Callum McKeethan', age: 2, birthday: '06/19/2023', sex: 'Male', school: 'Bullard Early Education (BEE)', classroom: 'Room 8', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'evelynmartinez0912@gmail.com',
    parentName: 'Evelyn Martinez',
    phone: '9038307022',
    address: '253 Briarbend Dr Rusk TX',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-12-17'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Julieta Garcia', age: 2, birthday: '11/10/2023', sex: 'Female', school: 'Methodist Readiness', classroom: 'Miss. Araceli', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'makaylacomer@yahoo.com',
    parentName: 'Makayla Helms',
    phone: '2145194818',
    address: '2525 Roy Rd Unit 301, Tyler, TX 75707',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2025-12-29'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Cohen Helms', age: 2, birthday: '2/23/2023', sex: 'Male', school: 'Tyler Christian Preschool', classroom: 'Older Twos', shirtSize: 'xSmall', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'kianawarren71@gmail.com',
    parentName: 'Kiana Warren',
    phone: '9036462638',
    address: '107 Southview Drive Henderson TX',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-03'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Kailani Porter', age: 2, birthday: '04/23/2023', sex: 'Female', school: 'Tyler Christian Preschool', classroom: "Older 2's", shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'lonestar142002@yahoo.com',
    parentName: 'Jaclyn',
    phone: '903-372-1091',
    address: '3290 FM 347 N Rusk TX 75785',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-07'),
    lastPayment: new Date('2026-01-07'),
    children: [
      { name: 'River Warren', age: 3, birthday: '10/24/2021', sex: 'Male', school: 'Mrs Vasquez', classroom: null, shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'shelbybrooke-15@hotmail.com',
    parentName: 'Shelby Whiteaker',
    phone: '936-366-3310',
    address: '2343 County Road 3707 Bullard, TX 75757',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-08'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'McKenzie Whiteaker', age: 2, birthday: '10/24/2023', sex: 'Female', school: 'Bullard Early Education', classroom: 'Room 7', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'anolliff@gmail.com',
    parentName: 'Ashley Olliff',
    phone: '3342243366',
    address: '1819 Picadilly Place, Tyler TX',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-08'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Saoirse Olliff', age: 3, birthday: '9/27/2022', sex: 'Female', school: 'Stepping Stone', classroom: 'Ms. Carol', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'alexismarshall2014@gmail.com',
    parentName: 'Alexis Callier',
    phone: '8582639401',
    address: '1318 W Paul St',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-15'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Kaycen', age: 4, birthday: '09292021', sex: 'Male', school: 'KinderCare', classroom: 'Pre-school', shirtSize: 'xSmall', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'layna13@icloud.com',
    parentName: 'Malayna McKelva',
    phone: '9033437800',
    address: '4088 CR 149, Apt F Flint, TX 75762',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-16'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Blakelee McKelva', age: 2, birthday: '10/6/2023', sex: 'Female', school: 'Bullard Early Education', classroom: 'Room 7', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'estefanialucas5696@gmail.com',
    parentName: 'Estefania Olivares',
    phone: '9039529696',
    address: '20063 Meadow West Lane',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-16'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Sofia Olivares', age: 4, birthday: '09/25/2021', sex: 'Female', school: 'Early Steps Bilingual Academy', classroom: "Mrs Dhalia's class", shirtSize: 'Small', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'athompson24@yahoo.com',
    parentName: 'Ashley Fettig',
    phone: '9035394154',
    address: '301 Savoy Street, Bullard',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-22'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Adalyn Fettig', age: 3, birthday: '11/30/2022', sex: 'Female', school: 'Stepping Stone', classroom: 'Miss Victoria', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'amandapriel12@gmail.com',
    parentName: 'Amanda Knowles',
    phone: '903-426-5133',
    address: '215 South Vine Ave Tyler, TX 75702',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-22'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Genevieve Dorothy Knowles (Genny)', age: 2, birthday: '01/04/2024', sex: 'Female', school: 'Tyler KinderCare', classroom: "2's", shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'khicks9210@gmail.com',
    parentName: 'Kristen Hicks',
    phone: '9033167648',
    address: '190 CR 1404 Jacksonville, TX 75766',
    package: 'Plan B - Pay in Full',
    amount: 450,
    status: 'active',
    enrolledDate: new Date('2026-01-26'),
    lastPayment: new Date('2026-01-26'),
    children: [
      { name: 'Samuel Hicks', age: 2, birthday: '11/28/2023', sex: 'Male', school: 'Methodist Readiness School', classroom: 'Ms Aracely', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'jeathrash15@gmail.com',
    parentName: 'Erin Curtis',
    phone: '903-393-2912',
    address: '116 Cody St Rusk Tx 75785',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-01-29'),
    lastPayment: new Date('2026-02-01'),
    children: [
      { name: 'Emerie Curtis', age: 4, birthday: '10/5/21', sex: 'Female', school: 'Methodist Readiness School', classroom: 'Pre-K 4', shirtSize: '4T', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'destineemanning11@yahoo.com',
    parentName: 'Destinee',
    phone: '903-742-0353',
    address: '16732 County Road 192',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'pending',
    enrolledDate: new Date('2026-02-02'),
    lastPayment: null,
    children: [
      { name: 'Courtney McClain (CJ)', age: 3, birthday: '06/22/2022', sex: 'Male', school: 'Stepping Stone School', classroom: 'Ms.Pat', shirtSize: 'Small', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'boydlatisha@yahoo.com',
    parentName: 'Latisha Boyd',
    phone: '9034075239',
    address: '422 Boyd Ln Tyler,Tx',
    package: 'Plan C - Pay',
    amount: 50,
    status: 'pending',
    enrolledDate: new Date('2026-02-02'),
    lastPayment: null,
    children: [
      { name: 'KaMora Boyd', age: 3, birthday: 'March 25, 2022', sex: 'Female', school: 'Tyler Christian Preschool', classroom: 'Pre K 1', shirtSize: 'Small', gummyBears: true, allergies: null }
    ]
  },
  {
    email: 'serg4361@gmail.com',
    parentName: 'Sergio Olivares',
    phone: '9033167033',
    address: '2827 Curtis Dr',
    package: 'Plan A - AutoPay',
    amount: 50,
    status: 'active',
    enrolledDate: new Date('2026-02-02'),
    lastPayment: new Date('2026-02-02'),
    isNew: true,
    children: [
      { name: 'Benjamin Olivares', age: 3, birthday: '12/15/22', sex: 'Male', school: 'Early Steps', classroom: 'Yuvi', shirtSize: '3T', gummyBears: true, allergies: null }
    ]
  },
]

async function main() {
  console.log('Seeding database with real enrollment data...')
  
  // Clear existing data
  await prisma.child.deleteMany()
  await prisma.enrollment.deleteMany()
  
  console.log('Cleared existing data')
  
  // Create enrollments with children
  for (const enrollment of enrollments) {
    const { children, ...enrollmentData } = enrollment
    
    try {
      await prisma.enrollment.create({
        data: {
          ...enrollmentData,
          children: {
            create: children,
          },
        },
      })
      console.log(`✓ Created enrollment for ${enrollment.parentName}`)
    } catch (error) {
      console.error(`✗ Failed to create enrollment for ${enrollment.parentName}:`, error)
    }
  }
  
  const count = await prisma.enrollment.count()
  console.log(`\n✅ Seeding complete! Created ${count} enrollments.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
