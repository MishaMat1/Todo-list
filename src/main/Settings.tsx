import { useState } from 'react'
import Help from '../main/Help'
import Switch from '@mui/material/Switch';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface SettingsProps {
    use12Hour: boolean;
    setUse12Hour: (value: boolean) => void;
    showEmptyLists: boolean;
    setShowEmptyLists: (value: boolean) => void;
}

export function Settings({ use12Hour, setUse12Hour,
    showEmptyLists, setShowEmptyLists }: SettingsProps) {

    const [subtab, setSubtab] = useState<'main' | 'help'>('main');

    if (subtab === 'help') {
        return <Help onBack={() => setSubtab('main')} />;
    }

    return (
        <div>
            <div className='flex flex-col items-center m-5 border border-gray-300 p-5'>
                <h1 className='text-xl font-bold w-full mb-2.5'>Settings</h1>
                <div className='flex flex-row justify-between w-full items-center mb-4'>
                    <h2>Change to 12-hour format</h2>
                    <Switch checked={use12Hour}
                        onChange={(e) => setUse12Hour(e.target.checked)} />
                </div>
                <div className='flex flex-row justify-between w-full items-center'>
                    <h2>Show tasks in one list</h2>
                    <Switch checked={showEmptyLists}
                        onChange={(e) => setShowEmptyLists(e.target.checked)} />
                </div>
            </div>
            <div className='flex flex-col items-center m-5 gap-6 border border-gray-300 p-5'>
                <h1 className='text-xl font-bold w-full '>More</h1>
                <button className='flex justify-between w-full' onClick={() => setSubtab('help')}>
                    <span>Help</span><ChevronRightIcon /></button>
                <a href="https://www.google.com/" className='flex justify-between w-full'>
                    <span>Visit out website</span><ChevronRightIcon /></a>
                <a href="mailto:mistermat2016@gmail.com" className='flex justify-between w-full'>
                    <span>Email us</span><ChevronRightIcon /></a>
            </div>
        </div>
    )
}
