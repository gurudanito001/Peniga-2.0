"use client"

import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";


type TabProps = {
  tabItems: string[],
  //defaultRoute?: string
}
const Tabs = ({tabItems}: TabProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const createTabURL = (tabName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', tabName);
    return `${pathname}?${params.toString()}`;
  };

  useEffect(()=>{
    if(!activeTab || !tabItems?.includes(activeTab)){
      router.push(`${pathname}?tab=${tabItems[0]}`)
    }
  },[])
  return (
    <section className='flex flex-col rounded-xl py-3' style={{width: "400px"}}>
      <div role="tablist" className="tabs tabs-lifted">
        {tabItems?.map(item => {
          return(<a key={item} role="tab" href={createTabURL(item)} className={clsx(
            'tab px-14 text-xs font-bold uppercase min-[300px]',
            {
              'tab-active [--tab-bg:#f6f3fd] opacity-75 [--tab-border-color:#691883] text-primary': item === activeTab,
              'text-base-content': item !== activeTab
            },
          )}
          
          >{item}</a>)
        })}
      </div>
    </section>
  )
}

export default Tabs;