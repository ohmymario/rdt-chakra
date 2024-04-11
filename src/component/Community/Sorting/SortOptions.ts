// Data file for Sorting Options

import { RiRocket2Fill } from 'react-icons/ri';
import { PiFlame } from 'react-icons/pi';
import { FaRegSun } from 'react-icons/fa';
import { FaEllipsisH } from 'react-icons/fa';
import { FaArrowUpWideShort } from 'react-icons/fa6';
import { IconType } from 'react-icons';

interface SortingOption {
  Text?: string;
  Icon: IconType;
}

const sortOptions: SortingOption[] = [
  {
    Text: 'Best',
    Icon: RiRocket2Fill,
  },
  {
    Text: 'Hot',
    Icon: PiFlame,
  },
  {
    Text: 'New',
    Icon: FaRegSun,
  },
  {
    Text: 'Top',
    Icon: FaArrowUpWideShort,
  },
  {
    Icon: FaEllipsisH,
  },
];

export default sortOptions;