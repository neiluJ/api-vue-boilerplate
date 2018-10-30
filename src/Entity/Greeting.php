<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * This is a dummy entity. Remove it!
 *
 * @ApiResource
 * @ORM\Entity
 */
class Greeting
{
    /**
     * @var int The entity Id
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @var string A nice person
     *
     * @ORM\Column
     * @Assert\NotBlank(message="forms.greetings_create.violations.name.not_blank")
     */
    public $name = '';

    /**
     * @var bool
     *
     * @Assert\IsTrue(message="forms.greetings_create.violation.testcheck.not_true")
     */
    protected $testcheck = false;

    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return bool
     *
     * @Assert\IsTrue(message="forms.greetings_create.violations.orphan.not_true")
     */
    public function isNeverOk() {
        return false;
    }

    /**
     */
    public function setTestcheck($testcheck): void
    {
        if (is_string($testcheck)) {
            $testcheck = ($testcheck === "on" || $testcheck === "true");
        }

        $this->testcheck = $testcheck;
    }

    /**
     * @return bool
     */
    public function getTestcheck()
    {
        return $this->testcheck;
    }
}
