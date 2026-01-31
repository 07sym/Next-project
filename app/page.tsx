import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
  <main className="flex min-h-screen items-start justify-center p-5">
   <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://www.luxurytrailsofindia.com/wp-content/uploads/2016/11/Tulip-Garden-Srinagar-Kashmir-India.jpg"
        alt="Tulip-Garden-Srinagar"
         className="relative z-20 aspect-video w-full object-cover "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Indira Gandhi Memorial Tulip Garden</CardTitle>
        <CardDescription>
          The Tulip festival is an annual Spring festival to increase tourism by the Government of Jammu and Kashmir. The festival showcases a variety of flowers in the garden.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Book Tour</Button>
      </CardFooter>
    </Card>
  </main>
  )
}



