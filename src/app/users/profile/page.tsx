"use client"

import { Button, CheckboxGroup, Input, Link, user } from "@nextui-org/react"
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react"
import { api } from "@convex/_generated/api"
import React, { useEffect, useState } from "react";
import CustomCheckbox from "@/components/ui/checkbox";
import { redirect, useRouter } from "next/navigation";



interface CoderProfileProps {

    params: { id: string }

}


const CoderProfile: React.FC<CoderProfileProps> = ({ params }) => {
    const [groupSelected, setGroupSelected] = useState([])

    const [stackGroup, setStackGroup] = React.useState([
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Convex",
        "Node.js",
    ])
    const [stackInput, setStackInput] = React.useState("")
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
        event
    ) => {
        if (stackGroup.includes(stackInput) && event.key === "Enter") {
            event.preventDefault()
            setGroupSelected([...groupSelected, stackInput] as never)
            setStackInput(() => "")
        } else if (event.key === "Enter") {
            event.preventDefault()
            setStackGroup([...stackGroup, stackInput] as never)
            setGroupSelected([...groupSelected, stackInput] as never)
            setStackInput(() => "")
        }
    }



    const { id } = params;

    // const user: object = useQuery(api.users.getUserByDescopeId, id)
    const user = useQuery(api.users.getUserByDescopeId, { descopeId: "U2cbR7qLGtmHuc8CDChE55e48qTh" })

    // console.log(user)

    const [name, setName] = useState("")
    // const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState("")
    // const [email, setEmail] = useState(user.email)
    const [github, setGithub] = useState("")
    const [githubAvatar, setGithubAvatar] = useState("")
    const [githubUrl, setGithubUrl] = useState("")
    const [githubLogin, setGithubLogin] = useState("")
    const [githubId, setGithubId] = useState("")
    // const [githubName, setGithubName] = useState("")

    const router = useRouter()


    const updateUser = useMutation(api.users.updateCoder)

    async function fetchGithub(event: React.FormEvent) {
        event.preventDefault()

        const res = await fetch(`https://api.github.com/users/${github}`)
        const data = await res.json();
        console.log(data)
        setGithubAvatar(data.avatar_url)
        setGithubUrl(data.html_url)
        setGithubLogin(data.login);
        setGithubId(data.id);
        // setGithubName(data.name);

    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const skillSet = groupSelected.map(stack => ({ name: stack }));

        const githubData = {
            avatar_url: githubAvatar,
            html_url: githubUrl,
            login: githubLogin,
            id: githubId,
            // name: githubName,
        }

        try {
            await updateUser({ id: 'j574axt1ax8ngf4y6h999xhjf16kvyj7', data: { name: name, email: email, github: githubData, skillSet: skillSet } })
        } catch (error) {
            console.error(error);
            alert(error)
        }

        router.push('/projects')

    }



    return (
        <div>

            <form className="grid grid-cols-1 w-full gap-4 max-w-xl place-items-center pb-6"
                onSubmit={fetchGithub}>
                <Avatar src={githubAvatar} />
                {/* get from github */}

                <Input
                    type="text"
                    label="GitHub Username"
                    placeholder="GitHub Username"
                    labelPlacement="outside"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                />

                {githubUrl && <p>Github url:  <Link href={githubUrl}> {githubUrl}</Link></p>}

                <Button color="primary" type="submit">Fetch GitHub Account</Button>
            </form>



            <form className="grid grid-cols-1 w-full gap-4 max-w-xl place-items-center"
                onSubmit={handleSubmit}>


                <Input
                    isRequired
                    type="text"
                    label="Display Name"
                    placeholder="What's Your Name"
                    defaultValue={user?.name}
                    labelPlacement="outside"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    labelPlacement="outside"
                    defaultValue={user?.email}
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div>
                    <CheckboxGroup
                        className="gap-1"
                        label="Select Tech Stacks"
                        orientation="horizontal"
                        value={groupSelected}
                        onChange={setGroupSelected}
                    >
                        {stackGroup.map((stack) => (
                            <CustomCheckbox value={stack} key={stack}>
                                {stack}
                            </CustomCheckbox>
                        ))}
                    </CheckboxGroup>
                    <p className="mt-4 ml-1 text-default-500">
                        Selected: {groupSelected.join(", ")}
                    </p>
                    <Input
                        type="text"
                        labelPlacement="outside"
                        placeholder="Tech Stacks"
                        variant="bordered"
                        onChange={(e) => setStackInput(e.target.value)}
                        value={stackInput}
                        onKeyDown={handleKeyDown}
                    />
                </div>


                <Button type="submit" color="primary">Update</Button>
            </form>
        </div >
    )
}


export default CoderProfile;