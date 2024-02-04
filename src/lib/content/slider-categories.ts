import {
  ArmchairIcon,
  BabyIcon,
  BadgeDollarSignIcon,
  BotIcon,
  BuildingIcon,
  CameraIcon,
  ComputerIcon,
  Disc2,
  FactoryIcon,
  Gamepad2Icon,
  KeyboardIcon,
  LibraryIcon,
  LuggageIcon,
  Music2Icon,
  Paintbrush2Icon,
  PawPrintIcon,
  Plug2Icon,
  ScissorsIcon,
  ShirtIcon,
  SmartphoneIcon,
  StampIcon,
  StarIcon,
  TicketIcon,
  TrophyIcon,
} from 'lucide-svelte';

const sliderCategories = [
  {
    text: 'Consumer Electronics',
    icon: Plug2Icon,
  },
  {
    text: 'Business & Industrial',
    icon: FactoryIcon,
  },
  {
    text: 'Coins & Paper Money',
    icon: BadgeDollarSignIcon,
  },
  {
    text: 'Pet Supplies',
    icon: PawPrintIcon,
  },
  {
    text: 'Books',
    icon: LibraryIcon,
  },
  {
    text: 'Music',
    icon: Music2Icon,
  },
  {
    text: 'Toys & Hobbies',
    icon: BotIcon,
  },
  {
    text: 'Cell Phones & Accessories',
    icon: SmartphoneIcon,
  },
  {
    text: 'Video Games & Consoles',
    icon: Gamepad2Icon,
  },
  {
    text: 'Tickets & Experiences',
    icon: TicketIcon,
  },
  {
    text: 'Crafts',
    icon: ScissorsIcon,
  },
  {
    text: 'Computers/Tablets & Networking',
    icon: ComputerIcon,
  },
  {
    text: 'Real Estate',
    icon: BuildingIcon,
  },
  {
    text: 'Baby',
    icon: BabyIcon,
  },
  {
    text: 'DVDs & Movies',
    icon: Disc2,
  },
  {
    text: 'Travel',
    icon: LuggageIcon,
  },
  {
    text: 'Stamps',
    icon: StampIcon,
  },
  {
    text: 'Clothing, Shoes & Accessories',
    icon: ShirtIcon,
  },
  {
    text: 'Cameras & Photo',
    icon: CameraIcon,
  },
  {
    text: 'Art',
    icon: Paintbrush2Icon,
  },
  {
    text: 'Musical Instruments & Gear',
    icon: KeyboardIcon,
  },
  {
    text: 'Collectibles',
    icon: TrophyIcon,
  },
  {
    text: 'Home & Garden',
    icon: ArmchairIcon,
  },
  {
    text: 'Antiques',
    icon: StarIcon,
  },
];

const mappedSliderCategories = new Map(
  sliderCategories.map((category) => [category.text, category.icon])
);

export const findIcon = (category?: string) => {
  const val = category ? mappedSliderCategories.get(category) : undefined;
  return val;
};
export default Object.freeze(mappedSliderCategories);
