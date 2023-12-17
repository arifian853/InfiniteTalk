import { Footer } from 'flowbite-react';
import { BsGithub } from 'react-icons/bs'
import { Link } from 'react-router-dom';

export const FooterMain = () => {
    return (
        <div>
            <Footer container>
                <div className="w-full">
                    <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div>
                            <h1 className='my-5 text-2xl font-semibold'><Link to='/feed'><span className="text-blue-400"> Infinite</span><span className="text-green-400">Talk!</span></Link></h1>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                            <div>
                                <Footer.Title title="about" />
                                <Footer.LinkGroup col>
                                <Link to='/about'>
                                        <Footer.Link>About Project</Footer.Link>
                                    </Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Source" />
                                <Footer.LinkGroup col>
                                    <Footer.Link href="https://github.com/arifian853/InfiniteTalk">GitHub</Footer.Link>
                                </Footer.LinkGroup>
                            </div>
                            <div>
                                <Footer.Title title="Legal" />
                                <Footer.LinkGroup col>
                                    <Link to='/tos'>
                                        <Footer.Link>Terms of Service</Footer.Link>
                                    </Link>

                                </Footer.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <Footer.Divider />
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright href="#" by="InfiniteTalk!" year={2023} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <Footer.Icon href="https://github.com/arifian853/InfiniteTalk" icon={BsGithub} />
                        </div>
                    </div>
                </div>
            </Footer>
        </div>
    )
}
