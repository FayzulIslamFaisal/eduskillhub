import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button, buttonVariants } from "@/components/ui/button";

const CourseCard = ({course}) => {
  return (
    <Link key={course.id} href={`/courses/${course.id}`}>
    <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={course?.thumbnail || "/placeholder.jpg"}
          alt={course?.title}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col pt-2">
        <div className="text-lg mb-3 md:text-xl capitalize font-semibold group-hover:text-sky-700 line-clamp-2">
          {course?.title}
        </div>
        <p className="text-basetext-slate-700">{course?.category?.title}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-3 text-black ">
            <div className="p-2 bg-slate-700 text-white rounded-lg">
              <BookOpen className="w-6 " />
            </div>
            <span className="text-base">{course?.modules?.length} Chapters</span>
          </div>
        </div>


        <div className="flex items-center justify-between mt-4">
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(course?.price)}
          </p>

          <Button
            variant="ghost"
            className="text-xs text-white hover:text-white h-7 gap-1 font-bold capitalize bg-slate-700 hover:bg-slate-800"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        </div>
      </div>
    </div>
  </Link>
  )
}

export default CourseCard