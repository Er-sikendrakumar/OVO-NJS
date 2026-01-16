"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import { ComponentBlock } from "@/app/view-all-component/ComponentBlock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { AspectRatio } from "@/app/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/carousel";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/collapsible";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/app/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";
import { Input } from "@/app/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/app/components/ui/input-otp";
import { Label } from "@/app/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/app/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";
import Padding from "@/app/components/ui/Padding";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import PopularCities from "@/app/components/ui/PopularCities";
import { Progress } from "@/app/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Separator } from "@/app/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Slider } from "@/app/components/ui/slider";
import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import { Toast, ToastAction, ToastDescription, ToastTitle } from "@/app/components/ui/toast";
import { Toaster } from "@/app/components/ui/toaster";
import { Toggle } from "@/app/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip";

import { toast } from "@/app/hooks/use-toast";

const sampleChartData = [
  { month: "Jan", visitors: 120 },
  { month: "Feb", visitors: 200 },
  { month: "Mar", visitors: 150 },
  { month: "Apr", visitors: 260 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "#36BFFA",
  },
};

export function UiShowcase() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState([40]);
  const [radioValue, setRadioValue] = useState("option-1");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const form = useForm<{ email: string }>({ defaultValues: { email: "" } });

  const commandItems = useMemo(
    () => ["Orlando", "Miami", "Tampa", "Atlanta"],
    []
  );

  return (
    <>
      <ComponentBlock name="UI.AlertDialog" jsonName="N/A">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Open Alert Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action can be undone later in settings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ComponentBlock>

      <ComponentBlock name="UI.Accordion" jsonName="N/A">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Accordion Item</AccordionTrigger>
            <AccordionContent>Accordion content goes here.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentBlock>

      <ComponentBlock name="UI.Alert" jsonName="N/A">
        <Alert>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Sample alert description.</AlertDescription>
        </Alert>
      </ComponentBlock>

      <ComponentBlock name="UI.AspectRatio" jsonName="N/A">
        <AspectRatio ratio={16 / 9}>
          <img src="/assets/mail-center.webp" alt="Sample" className="h-full w-full object-cover" />
        </AspectRatio>
      </ComponentBlock>

      <ComponentBlock name="UI.Avatar" jsonName="N/A">
        <Avatar>
          <AvatarImage src="/assets/mail-center.webp" />
          <AvatarFallback>OVO</AvatarFallback>
        </Avatar>
      </ComponentBlock>

      <ComponentBlock name="UI.Badge" jsonName="N/A">
        <Badge>Featured</Badge>
      </ComponentBlock>

      <ComponentBlock name="UI.Breadcrumb" jsonName="N/A">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentBlock>

      <ComponentBlock name="UI.Button" jsonName="N/A">
        <Button>Primary Button</Button>
      </ComponentBlock>

      <ComponentBlock name="UI.Calendar" jsonName="N/A">
        <Calendar mode="single" selected={calendarDate} onSelect={setCalendarDate} />
      </ComponentBlock>

      <ComponentBlock name="UI.Card" jsonName="N/A">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description.</CardDescription>
          </CardHeader>
          <CardContent>Card content goes here.</CardContent>
          <CardFooter>Card footer</CardFooter>
        </Card>
      </ComponentBlock>

      <ComponentBlock name="UI.Carousel" jsonName="N/A">
        <Carousel className="max-w-[360px]">
          <CarouselContent>
            {[1, 2, 3].map((item) => (
              <CarouselItem key={item}>
                <div className="p-4 border rounded">Slide {item}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ComponentBlock>

      <ComponentBlock name="UI.Chart" jsonName="N/A">
        <ChartContainer config={chartConfig}>
          <LineChart data={sampleChartData}>
            <CartesianGrid stroke="#E4E7EC" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="visitors" stroke="var(--color-visitors)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </ComponentBlock>

      <ComponentBlock name="UI.Checkbox" jsonName="N/A">
        <div className="flex items-center gap-2">
          <Checkbox checked={isChecked} onCheckedChange={(value) => setIsChecked(Boolean(value))} />
          <Label>Accept terms</Label>
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.Collapsible" jsonName="N/A">
        <Collapsible open={isCollapsibleOpen} onOpenChange={setIsCollapsibleOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline">Toggle Content</Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">Collapsible content.</CollapsibleContent>
        </Collapsible>
      </ComponentBlock>

      <ComponentBlock name="UI.Command" jsonName="N/A">
        <div className="w-full max-w-[360px]">
          <Command>
            <CommandInput placeholder="Search locations" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Cities">
                {commandItems.map((item) => (
                  <CommandItem key={item} onSelect={() => setSelectedCity(item)}>
                    {item}
                    <CommandShortcut>Enter</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>See all locations</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="mt-2 text-sm text-[#475467]">Selected: {selectedCity ?? "None"}</div>
          <Button className="mt-3" variant="outline" onClick={() => setCommandOpen(true)}>
            Open Command Dialog
          </Button>
          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Type a command" />
            <CommandList>
              <CommandItem>Open pricing</CommandItem>
            </CommandList>
          </CommandDialog>
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.ContextMenu" jsonName="N/A">
        <ContextMenu>
          <ContextMenuTrigger className="inline-flex border rounded px-4 py-2">
            Right click here
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Share</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </ComponentBlock>

      <ComponentBlock name="UI.Dialog" jsonName="N/A">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>Dialog description.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </ComponentBlock>

      <ComponentBlock name="UI.Drawer" jsonName="N/A">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer description.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ComponentBlock>

      <ComponentBlock name="UI.DropdownMenu" jsonName="N/A">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentBlock>

      <ComponentBlock name="UI.Form" jsonName="N/A">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => undefined)}
            className="max-w-[360px] space-y-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>We will never share your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ComponentBlock>

      <ComponentBlock name="UI.HoverCard" jsonName="N/A">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </HoverCardTrigger>
          <HoverCardContent>Hover card content.</HoverCardContent>
        </HoverCard>
      </ComponentBlock>

      <ComponentBlock name="UI.Input" jsonName="N/A">
        <Input placeholder="Type here" />
      </ComponentBlock>

      <ComponentBlock name="UI.InputOTP" jsonName="N/A">
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </ComponentBlock>

      <ComponentBlock name="UI.Label" jsonName="N/A">
        <Label htmlFor="sample-input">Sample label</Label>
      </ComponentBlock>

      <ComponentBlock name="UI.Menubar" jsonName="N/A">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ComponentBlock>

      <ComponentBlock name="UI.NavigationMenu" jsonName="N/A">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/virtual-office/">Virtual Office</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ComponentBlock>

      <ComponentBlock name="UI.Padding" jsonName="N/A">
        <Padding desktop="40px" mobile="20px" />
      </ComponentBlock>

      <ComponentBlock name="UI.Pagination" jsonName="N/A">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ComponentBlock>

      <ComponentBlock name="UI.Popover" jsonName="N/A">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>
      </ComponentBlock>

      <ComponentBlock name="UI.PopularCities" jsonName="N/A">
        <PopularCities state="Florida" cities={["Orlando", "Miami", "Tampa"]} />
      </ComponentBlock>

      <ComponentBlock name="UI.Progress" jsonName="N/A">
        <Progress value={66} />
      </ComponentBlock>

      <ComponentBlock name="UI.RadioGroup" jsonName="N/A">
        <RadioGroup value={radioValue} onValueChange={setRadioValue}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="option-1" />
            <Label htmlFor="option-1">Option 1</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="option-2" />
            <Label htmlFor="option-2">Option 2</Label>
          </div>
        </RadioGroup>
      </ComponentBlock>

      <ComponentBlock name="UI.Resizable" jsonName="N/A">
        <div className="h-[200px] w-full max-w-[420px] border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>
              <div className="p-3">Left panel</div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="p-3">Right panel</div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.ScrollArea" jsonName="N/A">
        <ScrollArea className="h-[120px] w-full max-w-[360px] border p-3">
          <div className="space-y-2">
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
            <p>Item 4</p>
            <p>Item 5</p>
          </div>
        </ScrollArea>
      </ComponentBlock>

      <ComponentBlock name="UI.Select" jsonName="N/A">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="orlando">Orlando</SelectItem>
            <SelectItem value="miami">Miami</SelectItem>
          </SelectContent>
        </Select>
      </ComponentBlock>

      <ComponentBlock name="UI.Separator" jsonName="N/A">
        <div className="w-full max-w-[360px]">
          <p>Before</p>
          <Separator className="my-2" />
          <p>After</p>
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.Sheet" jsonName="N/A">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet Title</SheetTitle>
              <SheetDescription>Sheet description.</SheetDescription>
            </SheetHeader>
            <SheetFooter className="mt-4">
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </ComponentBlock>

      <ComponentBlock name="UI.Sidebar" jsonName="N/A">
        <div className="w-full max-w-[640px] border">
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Dashboard</SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>Locations</SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter className="p-2 text-xs text-[#475467]">Footer</SidebarFooter>
            </Sidebar>
            <SidebarInset className="p-4">Sidebar content area</SidebarInset>
          </SidebarProvider>
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.Skeleton" jsonName="N/A">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.Slider" jsonName="N/A">
        <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
      </ComponentBlock>

      <ComponentBlock name="UI.Switch" jsonName="N/A">
        <div className="flex items-center gap-2">
          <Switch checked={switchEnabled} onCheckedChange={setSwitchEnabled} />
          <span className="text-sm">Enabled</span>
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.Table" jsonName="N/A">
        <Table>
          <TableCaption>Sample table</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Orlando</TableCell>
              <TableCell>FL</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentBlock>

      <ComponentBlock name="UI.Tabs" jsonName="N/A">
        <Tabs defaultValue="tab-1">
          <TabsList>
            <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab-1">Tab 1 content</TabsContent>
          <TabsContent value="tab-2">Tab 2 content</TabsContent>
        </Tabs>
      </ComponentBlock>

      <ComponentBlock name="UI.Textarea" jsonName="N/A">
        <Textarea placeholder="Type your message" />
      </ComponentBlock>

      <ComponentBlock name="UI.Toast" jsonName="N/A">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: "Toast Title",
                description: "This is a sample toast description.",
                action: <ToastAction altText="Undo">Undo</ToastAction>,
              })
            }
          >
            Show Toast
          </Button>
          <Toaster />
          <Toast open={false}>
            <ToastTitle>Example Toast</ToastTitle>
            <ToastDescription>Toast description</ToastDescription>
          </Toast>
        </div>
      </ComponentBlock>

      <ComponentBlock name="UI.Toggle" jsonName="N/A">
        <Toggle>Bold</Toggle>
      </ComponentBlock>

      <ComponentBlock name="UI.ToggleGroup" jsonName="N/A">
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </ComponentBlock>

      <ComponentBlock name="UI.Tooltip" jsonName="N/A">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ComponentBlock>
    </>
  );
}
