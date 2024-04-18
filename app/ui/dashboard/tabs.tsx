"use client"

import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";


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
    <section className='flex flex-col rounded-xl py-3 border-none' style={{width: "350px"}}>
      <div role="tablist" className="tabs tabs-lifted border-none">
        {tabItems?.map(item => {
          return(<Link key={item} role="tab" href={createTabURL(item)} className={clsx(
            'tab px-14 text-xs uppercase border-none',
            {
              ' text-primary font-extrabold': item === activeTab,
              'text-base-content': item !== activeTab
            },
          )}
          
          >{item}</Link>)
        })}
      </div>
    </section>
  )
}

export default Tabs;