import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

interface SearchAndSortProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

export function SearchAndSort({ searchQuery, setSearchQuery, sortBy, setSortBy }: SearchAndSortProps) {
    return (
        <div className='flex gap-4 p-4 w-full'>
            <TextField
                label="Search"
                variant="outlined"
                className='flex-2'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FormControl variant="filled" sx={{ minWidth: 140, flexShrink: 0, flexGrow: 1 }}>
                <InputLabel id="sort-by-label" shrink disableAnimation>
                    Sort by
                </InputLabel>

                <Select
                    labelId="sort-by-label"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
