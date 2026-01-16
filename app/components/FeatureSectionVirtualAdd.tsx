const features = [
  {
    title: "Live Receptionist Answering Calls",
    description:
      "Monday through Friday from 8:30am to 5:30pm (in PST timezone 8am to 5pm) a live receptionist will be answering all incoming calls on behalf of your company.",
  },
  {
    title: "Corporate Mailing Address",
    description:
      "Select one of our Virtual Offices locations as your primary business address and use it to receive all your mail and packages.",
  },
  {
    title: "Premium Call Transferring",
    description:
      "All calls that are being transferred to your personal extension by our Live Receptionist will ring up to 4 phone numbers provided by you. If the call is not answered your personal extension voice mail box will activate",
  },
  {
    title: "2 Voicemail Boxes",
    description:
      "Have 2 customized voice mail boxes with individual prerecorded greetings. 1 primary business mail box and 1 personalized extension with mail box.",
  },
  {
    title: "Company Phone and Fax Number",
    description:
      "Select one of our local phone and fax numbers as your primary company line.",
  },
  {
    title: "Voicemail Converted to Email",
    description:
      "All voice mail messages are being forwarded to Tenant's provided e-mail address as a WAV File.",
  },
  {
    title: "Fax Converted to Email",
    description:
      "All faxes received will be forwarded to your provided E-Mail address in a PDF format.",
  },
  {
    title: "Business Credit Reporting",
    description:
      "Complimentary reporting of your payment history to Moody's Credit Bureau each month.",
  },
];

export default function FeatureSectionVirtualAdd() {
  return (
    <section className="bg-[#065986] py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 sm:px-8">
        <div className="grid gap-y-8 gap-x-[132px] md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex min-h-[110px] w-full max-w-[480px] min-w-[320px] flex-col gap-2"
            >
              <h4 className="text-white font-inter text-[20px] font-semibold leading-[30px]">
                {feature.title}
              </h4>
              <p className="text-[#B9E6FE] font-inter text-[16px] font-normal leading-[24px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
