
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
import { Fragment } from "react";

const CourseCurriculam = async({course}) => {

    return (
        <>
            <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
                <span className="flex items-center gap-1.5">
                    <BookCheck className="w-4 h-4" />
                    {course?.modules?.length} Chapters
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock10 className="w-4 h-4" />
                    {course?.duration} Hours
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
                <Fragment key={module.id}>
                {/* <p>{module?.title}</p> */}
                <CourseModuleList module={module} key={module.id} />
                </Fragment>

            ))}
        </Accordion>
        </>
    );
};

export default CourseCurriculam;
