'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBMGee0vxxMNknXMjIVEb_VrR1vKdZKq-4",
    authDomain: "esp32-9225b.firebaseapp.com",
    databaseURL: "https://esp32-9225b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp32-9225b",
    storageBucket: "esp32-9225b.appspot.com",
    messagingSenderId: "904360444803",
    appId: "1:904360444803:web:90f673321afdbddcffecb6"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
const page = () => {
    const [speed, setSpeed] = useState(null);

    useEffect(() => {
      const fetchData = () => {
        const dbRef = firebase.database().ref('speed'); // Assuming 'speed' is the key in your database
        dbRef.on('value', (snapshot) => {
          const speedData = snapshot.val();
          setSpeed(speedData);
        });
      };
  
      fetchData();
  
      // Cleanup function to unsubscribe from the database when component unmounts
      return () => {
        firebase.database().ref('speed').off();
      };
    }, []);

    const [challans, setChallans] = useState([]);


    useEffect(() => {
        const fetchChallans = async () => {
            try {
                const response = await fetch('https://challan.glitch.me/challan');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setChallans(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchChallans();
    }, []);
  

  return (
    <>

  <div className="flex flex-col w-full min-h-screen">
    {/* <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
      <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
          <span className="sr-only">Acme Inc</span>
        </a>
        <a className="font-bold" href="#">
          Orders
        </a>
        <a className="text-gray-500 dark:text-gray-400" href="#">
          Products
        </a>
        <a className="text-gray-500 dark:text-gray-400" href="#">
          Analytics
        </a>
      </nav>
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 ml-auto sm:flex-initial">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
            >
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
          <img
            src="/placeholder.svg"
            width={32}
            height={32}
            className="rounded-full"
            alt="Avatar"
            style={{ aspectRatio: "32 / 32", objectFit: "cover" }}
          />
          <span className="sr-only">Toggle user menu</span>
        </button>
      </div>
    </header> */}
    <main className="grid min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="p-6 flex flex-row items-center space-y-0">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Map
            </h3>
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
              <span className="sr-only">Refresh</span>
            </button>
          </div>
          <div className="p-0">
          <MapContainer center={[21.1466, 79.0882]} zoom={12} style={{ height: "400px", width: "100%" }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[21.1466, 79.0882]}>
                    <Popup>
                      Nagpur, India
                    </Popup>
                  </Marker>
                </MapContainer>
          </div>
        </div>
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="p-6 flex flex-row items-center  space-y-0">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Speed
            </h3>
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
              </svg>
              <span className="sr-only">Refresh</span>
            </button>
          </div>
          <div className="p-6 flex items-center  text-5xl justify-center h-32">
          {speed !== null ? `${speed} km/h` : 'Loading...'}
        </div>
        </div>
      </div>
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
            User Information
          </h3>
        </div>
        <div className="p-6 grid gap-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>Name</div>
            <div>Sophia Anderson</div>
            <div>Address</div>
            <div>1234 Main St, Anytown, CA 12345</div>
            <div>Phone</div>
            <div>+1 888 8888 8888</div>
            <div>Email</div>
            <div>sophia@example.com</div>
          </div>
        </div>
      </div>
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
            Challans
          </h3>
        </div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Location
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                                {challans.map((challan) => (
                                    <tr key={challan._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                                            {challan.time}
                                        </td>
                                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                            {challan.latitude}, {challan.longitude}
                                        </td>
                                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                            {challan.challanGenerationInfo}
                                        </td>
                                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                                            {challan.challanCount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</>

  )
}

export default page