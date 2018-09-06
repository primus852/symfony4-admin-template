<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class RenderController extends AbstractController
{
    public function version()
    {

        /**
         * @todo Place own logic here
         */

        return new Response('1.0.0');
    }
}
