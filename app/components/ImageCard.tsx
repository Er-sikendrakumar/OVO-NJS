import Image from 'next/image';

interface ImageCardProps {
	imageSrc?: string;
	imageAlt?: string;
	cityName: string;
	address: string;
	subAddress?: string;
	isHighlight?: boolean;
}

export default function ImageCard(props: ImageCardProps) {
	const {
		imageSrc = '',
		imageAlt = '',
		cityName,
		address,
		subAddress,
		isHighlight = false,
	} = props;
	return (
		<>
			{isHighlight ? (
				<div className="flex flex-col lg:flex-row border-[4px] border-[#9DA4AE] rounded-[12px] h-full w-full bg-[#D5D7DA]">
					<div className="relative w-full lg:w-[239px] lg:max-w-[239px]">
						<Image
							src={imageSrc}
							alt={imageAlt}
							width={239}
							height={184}
							className="w-full h-full max-h-[184px]"
						/>

						<div className="absolute top-3 left-3 flex items-center gap-2 rounded-[12px] w-[140px] h-[36px]" style={{ padding: '4px 8px 4px 4px', background: 'linear-gradient(45deg, #FF7A00 0%, #FFD439 100%)' }}>
							<span className="px-[10px] py-[2px] rounded-[9px] bg-white capitalize text-[16px] text-[#252B37] text-center text-base font-medium leading-6">
								most
							</span>
							<span className="font-semibold text-white text-[16px] leading-[24px] capitalize">
								popular
							</span>
						</div>
					</div>

					<div className="flex-1 flex flex-col items-start p-6 gap-4 justify-between">
						<div className="w-full flex flex-col gap-1">
							<div className="w-full flex justify-between">
								<span className="text-[18px] font-semibold">{cityName}</span>

								<div className="bg-[#ECFDF3] border flex gap-2 items-center border-[#ABEFC6] py-1 pr-2 pl-1 text-[10px] rounded-full">
									<span className="border border-[#ABEFC6] px-2 py-[2px] rounded-full bg-white text-[#067647] leading-[18px] capitalize">
										Premium
									</span>
									<span className="text-[#067647] capitalize">location</span>
								</div>
							</div>

							<div className='max-w-[305px]'>
								<p className="text-[14px] text-[#475467] leading-5 truncate">
									{address}
								</p>
								<p className="text-[14px] text-[#475467] leading-5 truncate">
									{subAddress}
								</p>
							</div>

						</div>

						<button className="bg-[#36BFFA] text-white text-[14px] font-semibold px-[14px] py-[10px] rounded-lg w-full capitalize leading-5">
							learn more
						</button>
					</div>
				</div>
			) : (
				<div
					className="flex flex-col lg:flex-row rounded-[12px] h-full w-full bg-white"
					style={{ boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)' }}
				>
					<Image
						src={imageSrc}
						alt={imageAlt}
						width={239}
						height={184}
						className="w-full max-h-[184px] lg:max-w-[239px] h-full"
					/>

					<div className="w-full flex flex-col items-start p-6 gap-4 justify-between rounded-r-[12px] border-t border-r border-b border-[#EAECF0]">
						<div className="w-full flex flex-col gap-1">
							<div className="w-full flex justify-between items-center">
								<span className="text-[18px] font-semibold text-[#101828] leading-[28px]">
									{cityName}
								</span>

								<div className="bg-[#ECFDF3] border flex gap-2 items-center border-[#ABEFC6] py-1 pr-2 pl-1 text-[10px] rounded-full">
									<span className="border border-[#ABEFC6] px-2 py-[2px] rounded-full bg-white text-[#067647] leading-[18px] capitalize">
										Premium
									</span>
									<span className="text-[#067647] capitalize">location</span>
								</div>
							</div>
							<div className='max-w-[305px]'>
								<p className="text-[14px] font-normal text-[#475467] leading-5 truncate">
									{address}
								</p>
								<p className="text-[14px] font-normal text-[#475467] leading-5 truncate">
									{subAddress}
								</p>
							</div>
						</div>

						<button className="bg-[#36BFFA] text-white text-[14px] font-semibold px-[14px] py-[10px] rounded-lg w-full capitalize leading-5">
							learn more
						</button>
					</div>
				</div>
			)}
		</>
	);
}
