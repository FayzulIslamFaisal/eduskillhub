
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  } from "@/components/ui/accordion";

  import { BookCheck } from "lucide-react";
  import { Clock10 } from "lucide-react";
  import { Radio } from "lucide-react";
  import { Video } from "lucide-react";
  import { NotepadText } from "lucide-react";
  import { FileQuestion } from "lucide-react";
  import { PlayCircle } from "lucide-react";
  import { SquarePlay } from "lucide-react";
  import { Tv } from "lucide-react";
  import { StickyNote } from "lucide-react";
  import { cn } from "@/lib/utils";

  import CourseModuleList from "./module/CourseModuleList";

const CourseCurriculam = ({course}) => {
    const totalDuration = course?.modules.reduce(function (acc, obj) { return acc + obj.duration; }, 0);
    
    return (
        <>
            <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                    <BookCheck className="w-4 h-4" />
                    {course?.modules?.length} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock10 className="w-4 h-4" />
                    {(totalDuration/60).toPrecision(2)} Hours
                </span>
            </div>

            {/* contents */}
            <Accordion
            type="single"
            collapsible
            className="w-full"
        >
            {course?.modules &&
            course.modules.map((module) => (
                <AccordionItem key={module.id} value={`module-${module.id}`}>
                <AccordionTrigger className=" py-1 capitalize text-lg px-3 inline">{module?.title}</AccordionTrigger>
                <AccordionContent>
                    <p>{module.description}</p>
                    {/* যদি চাইলে এখানে CourseModuleList ব্যবহার করতে পারো */}
                    {/* <CourseModuleList module={module} /> */}
                </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
        </>
    );
};

export default CourseCurriculam;
