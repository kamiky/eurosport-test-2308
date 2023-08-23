import { PropsWithChildren } from "react";

export function Container(props: { id?: string } & PropsWithChildren) {
  return (
    <div id={props.id} className="container mx-auto m-10">
      {props.children}
    </div>
  );
}

export function Frame(props: { id?: string } & PropsWithChildren) {
  return (
    <div id={props.id} className="bg-gray-200 rounded-xl shadow border p-8">
      {props.children}
    </div>
  );
}

export function Padding(props: { id?: string } & PropsWithChildren) {
  return (
    <div id={props.id} className="p-8">
      {props.children}
    </div>
  );
}

export function FlexRow(props: { id?: string } & PropsWithChildren) {
  return (
    <div id={props.id} className="flex flex-row justify-between">
      {props.children}
    </div>
  );
}
