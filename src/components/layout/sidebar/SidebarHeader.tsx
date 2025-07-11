export function SidebarHeader() {
  return (
    <div className="px-7 py-4 border-b border-verdash-divider/30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-verdash-primary to-verdash-cyan flex items-center justify-start shadow-lg shrink-0 ml-[5px]">
          <img 
            src="/lovable-uploads/10cfd476-2094-4d85-aaa8-884b089f6dc8.png" 
            alt="Verdash Logo" 
            className="w-6 h-6 object-contain filter brightness-0 invert"
          />
        </div>
        <div className="group-data-[collapsible=icon]:hidden">
          <h1 className="font-semibold text-xl text-white font-inter">Verdash</h1>
        </div>
      </div>
    </div>
  );
}
