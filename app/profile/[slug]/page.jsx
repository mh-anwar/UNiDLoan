'use client';
import Markdown from 'react-markdown';
import {
    People,
    PeopleFill,
    Linkedin,
    GraphUpArrow,
    Coin,
} from 'react-bootstrap-icons';
import {
    Button,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import pfp from '/public/pfp.jpg';
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area,
    ResponsiveContainer,
    Line,
} from 'recharts';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/app/layout';
import { Glow, GlowCapture } from '@codaworks/react-glow';

const summary = {
    name: 'Arihan Sharma',
    desc: `### Hi there! 👋
- I'm **Arihan Sharma**, a Canadian Senior passionate about **Computer Engineering**. 😄
- 🌱 I’m experienced in **fullstack development**.
- ⚡ I love working with **C++**, **Java**, **C#**, **Python**.

Check out my [portfolio!](https://frostbiiten.github.io/mypage)
`,
    email: 'sofwarearihan@gmail.com',
    investors: 20,
};

const investor = {
    name: 'Arihan Sharma',
    desc: `i just loaned you 3 dollar when will i get it back bro`,
    email: 'sofwarearihan@gmail.com',
    investors: 20,
};

function Investor({ data }) {
    console.log(data);
    const { displayContract, setDisplayContract } = useContext(UserContext);

    return (
        <button
            className="p-3 bg-transparent"
            onClick={() => {
                setDisplayContract(true);
            }}
        >
            <GlowCapture>
                <Glow color="white">
                    <div className="duration-300 transition-all border-[1.5px] bg-gray-50/[0.01] glow:bg-violet-400/5 hover:bg-gray-50/[0.05] hover:shadow-sm border-gray-300/20 rounded-xl p-6 flex flex-col gap-3 w-full">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-row items-center">
                                <Image
                                    alt="Profile picture"
                                    src={pfp}
                                    className="w-20 mr-4 rounded-full"
                                />
                                <h3 className="text-xs font-bold text-left whitespace-pre-wrap w-min sm:text-2xl lg:text-3xl">
                                    {data.investorName}
                                </h3>
                            </div>
                            <div>
                                <h3 className="text-gray-400 glow:text-purple-100/70 font-[700] text-7xl">
                                    {data.loanAmount}
                                </h3>
                                <div className="flex flex-row mt-3">
                                    <p className="flex-grow text-left">NEAR</p>
                                    <p className="text-gray-100/60 font-[400]">
                                        {data.interestRate} %
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Glow>
            </GlowCapture>
        </button>
    );
}

function StudentPreview({ data, investorData }) {
    return (
        <div className="flex flex-col gap-5 p-8 border-2 rounded-md border-zinc-800 text-nowrap text-zinc-100 h-min">
            <Image
                alt="Profile Picture"
                src={pfp}
                width={100}
                className="w-full rounded-full"
            ></Image>

            <div className="gap-4 text-zinc-300">
                <h2 className="font-[600] text-zinc-100 text-xl">
                    {data.firstName + ' ' + data.lastName}{' '}
                </h2>
                <hr className="h-px mt-5 mb-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <div className="h-2" />
                <div className="space-y-4">
                    <Link
                        className=" flex flex-row items-center gap-2 hover:font-[900] transition-all duration-500
            border-[2px] border-transparent hover:border-blue-700
            bg-blue-700 hover:text-zinc-50
            text-zinc-300 hover:bg-slate-800
            rounded-lg py-[0.3rem] justify-center"
                        href={data.linkedin}
                    >
                        <Linkedin />
                        LinkedIn
                    </Link>

                    <div
                        className="flex flex-row items-center gap-2 hover:font-[900] transition-all duration-500
            border-[2px] border-emerald-700
            text-emerald-500 hover:text-emerald-300
            rounded-lg py-[0.2rem] justify-center"
                    >
                        <PeopleFill />
                        <p>
                            <b>{investorData && investorData.length}</b>{' '}
                            Investors
                        </p>
                    </div>
                </div>
                {false && (
                    <Markdown className="space-y-2 leading-7">
                        {data.bio}
                    </Markdown>
                )}
            </div>
        </div>
    );
}

function PerfGraph() {
    const dataArr = Array.from(
        { length: 30 },
        (_, ind) =>
            100 + ind * 3 + Math.floor(Math.sqrt(ind) * Math.random() * 20)
    );
    const data = dataArr.map((value, index) => ({
        x: index,
        value,
    }));

    const max = Math.max(...dataArr);
    const min = Math.min(Math.min(...dataArr), 0);
    const delta = dataArr[dataArr.length - 1] - dataArr[0];
    const col = delta < 0 ? 'red' : '#34d399';
    console.log(min);
    return (
        <div className="w-full h-full bg-transparent rounded-md">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient
                            id="colorValue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={col}
                                stopOpacity={0.5}
                            />
                            <stop
                                offset="90%"
                                stopColor={col}
                                stopOpacity={0.05}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="x" tickCount={3} />
                    <YAxis domain={[min, max + 30]} tickCount={20} />
                    <CartesianGrid
                        strokeDasharray={[]}
                        strokeWidth={2}
                        strokeOpacity={0.15}
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={col}
                        strokeWidth={2}
                        fill="url(#colorValue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

function Tabs({ data }) {
    const { nearID } = useContext(UserContext);

    return (
        <TabGroup className="flex-grow p-3">
            <TabList className="space-x-3">
                {nearID && (
                    <Tab className="py-2 transition-all duration-300 border-2 border-b-0 rounded-lg rounded-b-none outline-none border-zinc-800 ui-not-selected:opacity-40 hover:border-zinc-500 ui-selected:border-green-500/60 ui-selected:bg-green-950/30 hover:px-7 ui-selected:px-10">
                        <div className="flex flex-row items-center gap-3">
                            <Coin />
                            Investors
                        </div>
                    </Tab>
                )}
                <Tab className="py-2 transition-all duration-300 border-2 border-b-0 rounded-lg rounded-b-none outline-none border-zinc-800 ui-not-selected:opacity-40 hover:border-zinc-500 ui-selected:border-green-500/60 ui-selected:bg-green-950/30 hover:px-7 ui-selected:px-10">
                    <div className="flex flex-row items-center gap-3">
                        <GraphUpArrow />
                        Performance
                    </div>
                </Tab>
            </TabList>
            <TabPanels className="leading-6 text-gray-300">
                {nearID && (
                    <TabPanel className="grid w-full h-full grid-cols-3 p-3 border-2 rounded-b-2xl border-zinc-800">
                        {data?.map((investor) => {
                            return (
                                <Investor key={investor.date} data={investor} />
                            );
                        })}
                    </TabPanel>
                )}
                <TabPanel className="w-full h-full">
                    <div className="flex flex-row justify-center">
                        <h1 className="text-zinc-300 text-4xl font-[600] ml-12 my-6">
                            Performance
                        </h1>
                    </div>
                    <PerfGraph />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    );
}

function StudentProfile({ params }) {
    const [data, setData] = useState(null);
    const [investorData, setInvestorData] = useState(null);

    useEffect(() => {
        console.log(params.slug);
        fetch(`/api/student/${params.slug}`)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            });
        // Also fetch all investors who have invested into this person
        fetch(`/api/contracts?studentId=${params.slug}`)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                setInvestorData(data);
                console.log(data);
            });
    }, [params.slug]);

    return (
        <div className="flex flex-col items-center justify-center w-screen">
            <div className="min-w-[30rem] w-11/12 max-w-[85rem] bg-red-500/0 font-sgt p-3 rounded-lg gap-8 flex flex-row">
                {data && (
                    <StudentPreview data={data} investorData={investorData} />
                )}{' '}
                <div className="space-y-4">
                    <Markdown className="p-10 space-y-4 border-2 rounded-md border-zinc-800">
                        {data?.bio}
                    </Markdown>
                    <Tabs data={investorData} />
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;
