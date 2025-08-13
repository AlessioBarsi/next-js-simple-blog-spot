'use client';

import { Category, Genre, User } from "@/src/app/generated/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CalendarIcon, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { redirect } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

type Props = {
    authors: User[],
    genres: Genre[],
    categories: Category[],
}

export default function SearchButtons({ authors, genres, categories }: Props) {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [date, setDate] = useState<Date | undefined>();

    const handleSearchContent = () => {
        if (searchTerm.trim() === '') {
            toast.error('Please enter a search term');
            return;
        } else {
            redirect(`/posts/search/${searchTerm}`);
        }
    }

    const handleSearchCategory = () => {
        if (selectedCategory.trim() === '') {
            toast.error('Please select a category');
            return;
        } else {
            redirect(`/posts/category/${selectedCategory}`);
        }
    }

    const handleSearchGenre = () => {
        if (selectedGenre.trim() === '') {
            toast.error('Please select a genre');
            return;
        } else {
            redirect(`/posts/genre/${selectedGenre}`);
        }
    }

    const handleSearchAuthor = () => {
        if (selectedAuthor.trim() === '') {
            toast.error('Please select an author');
            return;
        } else {
            redirect(`/posts/author/${selectedAuthor}`);
        }
    }

    const handleSearchDate = () => {
        if (!date) {
            toast.error('Please select a date');
            return;
        } else {
            redirect(`/posts/date/${format(date, 'yyyy-MM-dd')}`);
        }
    }

    return (
        <div>
            <Accordion type="single" collapsible className="w-[70%]">
                <AccordionItem value="item-1">
                    <AccordionTrigger><div className="font-medium text-1xl">Search Posts</div><Search /></AccordionTrigger>
                    <AccordionContent>

                        <Tabs defaultValue="content" className="w-[400px]">
                            <TabsList>
                                <TabsTrigger value="content">Content</TabsTrigger>
                                <TabsTrigger value="category">Category</TabsTrigger>
                                <TabsTrigger value="genre">Genre</TabsTrigger>
                                <TabsTrigger value="author">Author</TabsTrigger>
                                <TabsTrigger value="date">Date</TabsTrigger>
                            </TabsList>

                            <TabsContent value="content">
                                <Input
                                    type="text"
                                    placeholder="Search by content or title"
                                    className="w-[50%]"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button className="mt-2 w-[50%]" onClick={handleSearchContent}>Search</Button>
                            </TabsContent>

                            <TabsContent value="category">
                                <Select onValueChange={(value) => setSelectedCategory(value)}>
                                    <SelectTrigger className="w-[50%]">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            {categories.map(category => (
                                                <SelectItem key={category.id} value={category.name}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Button className="mt-2 w-[50%]" onClick={handleSearchCategory}>Search</Button>
                            </TabsContent>

                            <TabsContent value="genre">
                                <Select onValueChange={(value) => setSelectedGenre(value)}>
                                    <SelectTrigger className="w-[50%]">
                                        <SelectValue placeholder="Select a genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Genres</SelectLabel>
                                            {genres.map(genre => (
                                                <SelectItem key={genre.id} value={genre.name}>
                                                    {genre.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Button className="mt-2 w-[50%]" onClick={handleSearchGenre}>Search</Button>
                            </TabsContent>

                            <TabsContent value="author">
                                <Select onValueChange={(value) => setSelectedAuthor(value)}>
                                    <SelectTrigger className="w-[50%]">
                                        <SelectValue placeholder="Select an author" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Authors</SelectLabel>
                                            {authors.map(author => (
                                                <SelectItem key={author.id} value={(author.id).toString()}>
                                                    {author.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Button className="mt-2 w-[50%]" onClick={handleSearchAuthor}>Search</Button>
                            </TabsContent>

                            <TabsContent value="date">
                                <div className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={!date}
                                                className="data-[empty=true]:text-muted-foreground w-[50%] justify-start text-left font-normal"
                                            >
                                                <CalendarIcon />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={date} onSelect={setDate} />
                                        </PopoverContent>
                                    </Popover>
                                    <Button className="mt-2 w-[50%]" onClick={handleSearchDate}>Search</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>


        </div>
    );
}