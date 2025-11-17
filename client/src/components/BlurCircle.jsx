const BlurCircle = ({top = "auto", left = "auto", right = "auto", bottom = "auto"}) => {
  return (
    <div className="absolute -z-50 h-[232px] w-[232px] aspect-square rounded-full bg-[rgba(248,69,101,0.3)] blur-3xl" style={{top: top, left: left , right: right, bottom: bottom }}>

    </div>
  )
}

export default BlurCircle